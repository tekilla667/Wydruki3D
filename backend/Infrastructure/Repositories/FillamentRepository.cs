using Core.Entities;
using Core.Interfaces;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class FillamentRepository : GenericRepository<Filaments>, IFillamentRepository
    {
        private StoreContext _context;
        public FillamentRepository(StoreContext context) : base(context)
        {
            _context = context;
        }
        public async Task<Filaments> GetByIdAsync(int id)
        {
           var filament = await _context.Filaments.FirstOrDefaultAsync(x => x.Id == id);
            return filament;
        }

        public async Task<Filaments> getByIdAsync(int id)
        {
            var filament = await _context.Filaments.FirstOrDefaultAsync(x => x.Id == id);
            return filament;
        }

        public async Task<IReadOnlyList<Filaments>> ListAllAsync()
        {
            return await _context.Filaments.ToListAsync();
        }
    }
}
