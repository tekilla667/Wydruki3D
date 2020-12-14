using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Core.Interfaces;
using Infrastructure.Context;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Core.Helpers;
using System.Linq;

namespace Infrastructure.Repositories
{
    public class StoreProductRepository : IStoreProductRepository
    {
        private readonly StoreContext _context;

        public StoreProductRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyList<StoreProduct>> GetAllStoreProductsAsync()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<StoreProduct> GetStoreProductByIdAsync(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<IReadOnlyList<StoreProduct>> GetStoreProductsAsync(QueryData data)
        {
            var query = _context.Products.AsQueryable();

            if (data.prodId!=0)
            {
               var q = query.Where(x => x.Id == data.prodId);
                query = q;
                
                return await returnProds(query, data);
            }
            
                   
            if (data.typeIdSearch!=0)
            {
                query = _context.Products.Where(x => x.TypeId == data.typeIdSearch).AsQueryable();
               
                if (!String.IsNullOrEmpty(data.name))
                {
                   var q = query.Where(x => x.Name.ToLower().Contains(data.name.ToLower()));
                    query = q;
                    
                }
                if (data.priceSort == 1)
                {   
                    var q = query.OrderBy(x => x.Price);
                    query = q;
                }
                if (data.priceSort == 2)
                {
                    var q = query.OrderByDescending(x => x.Price);
                    query = q;
                }
                return await returnProds(query, data);
            }
            if (!String.IsNullOrEmpty(data.name))
            {
                var q = query.Where(x => x.Name.ToLower().Contains(data.name.ToLower()));
                query = q;

            }
            if (data.priceSort == 1)
            {
                var q = query.OrderBy(x => x.Price);
                query = q;
            }
            if (data.priceSort == 2)
            {
                var q = query.OrderByDescending(x => x.Price);
                query = q;
            }


            return await returnProds(query, data);

        }

       private async Task<IReadOnlyList<StoreProduct>> returnProds (IQueryable<StoreProduct> query, QueryData data)
        {
            
            var q = query.Skip((data.currentPageIndex - 1) * data.productsPerPage).Take(data.productsPerPage);
            query = q;
            return await query.ToListAsync();


        }
    }
}
