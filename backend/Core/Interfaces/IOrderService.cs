using Core.Entities;
using Core.Entities.OrderEntities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Core.Helpers;
namespace Core.Interfaces
{
    public interface IOrderService
    {
        Task<Order> CreateOrderAsync(string buyerEmail, int delvieryMethod, string basketId, OrderAddress shippingAdress);
        Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail);
        Task<Order> GetOrderByIdAsync(int id, string buyerEmail);
        Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync();
        Task<IReadOnlyList<Order>> GetOrdersFromLastMonthAsync();
        Task<IReadOnlyList<decimal>> GetEarningsFromLastMonthAsync();
        Task<IReadOnlyList<Order>> GetLastTenOrders();
        Task<IReadOnlyList<AdminUserList>> GetAdminUserList();

    }
}
