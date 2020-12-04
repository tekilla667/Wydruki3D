using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Core.Interfaces;
using Infrastructure.Context;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class StoreProductRepository : IStoreProductRepository
    {
        private readonly StoreContext _context;

        public StoreProductRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<StoreProduct> GetStoreProductByIdAsync(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<IReadOnlyList<StoreProduct>> GetStoreProductsAsync()
        {
            return await _context.Products.ToListAsync();
        }
    }
}
