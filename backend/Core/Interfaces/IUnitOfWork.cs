using Core.Entities;
using Core.Entities.OrderEntities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
        public interface IUnitOfWork : IDisposable
        {
        IDeliveryMethodsRepository _deliveryMethods { get; }
        IRepository<StoreProduct> _products { get; }   
        IRepository<Order> _orders { get; }

            Task<int> Complete();
        Task<IEnumerable<Order>> GetTenOrdersWithSkip(int skip);
        Task<IEnumerable<Order>> GetOrdersFromUser(string email);
        Task<int> ChangeOrderStatus(OrderStatus status, int id);
    }
 
}
