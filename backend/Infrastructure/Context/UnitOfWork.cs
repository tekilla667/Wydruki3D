using Core.Entities;
using Core.Entities.OrderEntities;
using Core.Interfaces;
using Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Infrastructure.Context
{
     public class UnitOfWork : IUnitOfWork
    {
        private readonly StoreContext _context;
        public UnitOfWork(StoreContext context)
        {
            _context = context;
            _deliveryMethods = new DeliveryMethodsRepository(_context);
            _products = new GenericRepository<StoreProduct>(_context);
            _orders = new GenericRepository<Order>(_context);
        }

        public IDeliveryMethodsRepository _deliveryMethods { get; }
        public IRepository<StoreProduct> _products { get; }
        public IRepository<Order> _orders { get; }

       

        public async Task<int> Complete()
        {
            return await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Order>> GetTenOrdersWithSkip(int skip)
        {
            var orders = await _context.Orders.Include(x => x.CustomOrderItems).Include(x => x.DeliveryMethod).Include(x => x.OrderItems).ToListAsync();
            return orders;
        }
        public async Task<int> ChangeOrderStatus(OrderStatus status, int id)
        {
            var order = await _context.Orders.FindAsync(id);
            order.Status = status;
            var result = await Complete();
            return result;
        }
        public void Dispose()
        {
            _context.Dispose();
            
        }

        public async Task<IEnumerable<Order>> GetOrdersFromUser(string email)
        {
            var orders = await _context.Orders.Where(x => x.BuyerEmail == email).Include(x => x.CustomOrderItems).Include(x => x.DeliveryMethod).Include(x => x.OrderItems).ToListAsync();
            return orders;
        }
    }
}
