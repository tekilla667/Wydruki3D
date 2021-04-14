using Core.Entities;
using Core.Entities.OrderEntities;
using Core.Interfaces;
using Infrastructure.Context;
using NpgsqlTypes;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Core.Helpers;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        StoreContext _context;
        IBasketRepository _basketRepo;
        IUnitOfWork _unitOfWork;
        IPriceCalculatorService _priceCalculatorService;
        IModelVolumeRepository _modelVolumeRepository;
        public OrderService(IBasketRepository basketRepo, StoreContext context,IPriceCalculatorService calc, IModelVolumeRepository modelVolumeRepository)
        {
            _context = context;
            _basketRepo = basketRepo;
            _unitOfWork = new UnitOfWork(_context);
            _priceCalculatorService = calc;
            _modelVolumeRepository = modelVolumeRepository;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int delvieryMethod, string basketId, OrderAddress shippingAdress)
        {
            Order toAdd = new Order
            {
                BuyerEmail = buyerEmail,
                ShipToAddress = shippingAdress,
                DeliveryMethod = _unitOfWork._deliveryMethods.GetById(delvieryMethod)
            };
            var basket =  _basketRepo.GetBasketAsync(basketId).Result;
            var bCustomOrders = _basketRepo.GetBasketAsync(basketId).Result.CustomOrderItems;
            decimal price = 0;
            List<OrderItem> oItems = new List<OrderItem>();
            foreach(var item in basket.BasketItems)
            {
                var prodItemOrdered = new ProductItemOrdered();
                prodItemOrdered.PictureUrl = item.PictureUrl;
                prodItemOrdered.ProductItemId = item.Id;
                prodItemOrdered.ProductName = item.ProductName;
                var orderItem = new OrderItem();
                orderItem.ItemOrdered = prodItemOrdered;
                orderItem.Price = _unitOfWork._products.GetById(item.Id).Price;
                orderItem.Quantity = item.Quantity;
                price += orderItem.Price*orderItem.Quantity;
                oItems.Add(orderItem);
            }
            List<CustomOrderItem> bcustomItems = new List<CustomOrderItem>();
            foreach (var item in basket.CustomOrderItems)
            {
                var volume = await _modelVolumeRepository.getModelVolume(item.ModelName);
                var modelPrice = await _priceCalculatorService.calculatePrice(volume, item.FilamentId, (double)item.FilingPercent/100);
                Console.WriteLine("CENA MODELU PRZED ZAOKRAGLENIEM");
                Console.WriteLine(modelPrice);
                modelPrice = Math.Round(modelPrice, 2);
                Console.WriteLine("CENA MODELU PO:");
                Console.WriteLine(modelPrice);
                CustomOrderItem newCustomItem = new CustomOrderItem
                {
                    UsersId = item.UsersId,
                    ModelName = item.ModelName,
                    Quantity = item.Quantity,
                    FilamentId = item.FilamentId,
                    FilingPercent = item.FilingPercent,
                    ColorId = item.ColorId,
                    Price = Convert.ToDecimal(modelPrice)

                };
                bcustomItems.Add(newCustomItem);
                price += Convert.ToDecimal(modelPrice * item.Quantity);
            }
            toAdd.CustomOrderItems = bcustomItems;
            toAdd.OrderItems = oItems;
            toAdd.Subtotal = price;
            _unitOfWork._orders.Add(toAdd);
            var result = await _unitOfWork.Complete();
            if (result < 1)
                return null;

            return toAdd;
            
        }

        public async Task<IReadOnlyList<AdminUserList>> GetAdminUserList()
        {
            var orders = await _unitOfWork._orders.GetAll();
            List < AdminUserList > lista = orders.GroupBy(x => x.BuyerEmail).Select(group => new AdminUserList {
                Email = group.Key,
                OrdersCount = group.Count(),
                LastOrderDate = group.OrderBy(x => x.OrderDate).Last().OrderDate.ToString(),
                OrdersValue = group.Sum(x => x.Subtotal)
            }).ToList();
            return  lista;
        }

        public Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return _unitOfWork._deliveryMethods.GetAll();
        }

        public async Task<IReadOnlyList<decimal>> GetEarningsFromLastMonthAsync()
        {
            List<decimal> orderCost = new List<decimal>();
            decimal earnings = 0;
            var lastMonth = DateTime.Now.AddDays(-30);
            var weekBegin = DateTime.Now.AddDays(-7);
            var weekEnd = weekBegin.AddDays(7);
            var orders = await _context.Orders.Where(o => (o.OrderDate >= lastMonth)).OrderBy(o => o.OrderDate).ToListAsync();
            var group = orders.Where(o => o.OrderDate >= weekBegin && o.OrderDate <= weekEnd);
            foreach (var order in group)
            {
                earnings += order.Subtotal;
            }
             orderCost.Add(earnings);
            Console.WriteLine(weekBegin);
            Console.WriteLine(weekEnd);
            for (int i = 0; i < 3; i++)
            {
                earnings = 0;
                weekBegin = weekBegin.AddDays(-7);
                weekEnd = weekBegin.AddDays(7);
                group = orders.Where(o => (o.OrderDate >= weekBegin && o.OrderDate <= weekEnd));

                foreach (var order in group)
                {
                    earnings += order.Subtotal;
                }
                orderCost.Add(earnings);
                Console.WriteLine(weekBegin);
                Console.WriteLine(weekEnd);
            }
            foreach (var cost in orderCost)
            {
                Console.WriteLine("tydzien" + cost);
            }
            return orderCost;
        }

        public async Task<IReadOnlyList<Order>> GetLastTenOrders()
        {
            var orders = await _context.Orders.Include(x => x.DeliveryMethod)
                .Include(x => x.CustomOrderItems).Include(x => x.OrderItems)
                .OrderByDescending(o => o.OrderDate).Take(10).ToListAsync();
            return orders.AsReadOnly();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {

            var now = DateTimeOffset.Now;
           // var orders = _context.Orders.Where(o => ((now - DateTimeOffset.Parse(o.OrderDate)).TotalDays < 30)).ToList();



          //  var orders = _context.Orders.Where(o => o.Id > 5).ToList();

            //foreach (var order in orders)
            //{

            //    Console.WriteLine(order.Subtotal);
            //}
            //var order = await _context.Orders.FindAsync(id); 
            //Console.WriteLine("Liczba dni:");
            //Console.WriteLine((DateTimeOffset.Now - DateTimeOffset.Parse(order.OrderDate)).TotalDays);
            var costam =  await _context.Orders.FindAsync(id);
           // Console.WriteLine((int)(now - DateTimeOffset.Parse(costam.OrderDate)).TotalDays);
            return costam;
        }

        public Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            throw new NotImplementedException();
        }

        public async Task<IReadOnlyList<Order>> GetOrdersFromLastMonthAsync()
        {
            var orders = await _context.Orders.TakeLast(10).ToListAsync();
            return orders.AsReadOnly();
        }
        
        
    }
}
