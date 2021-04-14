using Core.Entities;
using Core.Interfaces;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace Infrastructure.Repositories
{
    public class DeliveryMethodsRepository : GenericRepository<DeliveryMethod>, IDeliveryMethodsRepository
    {
        private StoreContext _context;
        public DeliveryMethodsRepository(StoreContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<DeliveryMethod> OrderByCheapest()
        {
            return _context.DeliveryMethods.OrderBy(x => x.Price).ToList();
        }
    }
}
