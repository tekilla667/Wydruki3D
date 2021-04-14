using Core.Entities;
using Core.Helpers;
using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Infrastructure.Repositories;
using System.Threading.Tasks;
using Infrastructure.Context;

namespace Infrastructure.Services
{
    public class PriceCalculatorService : IPriceCalculatorService
    {
        private  FillamentRepository _repo;

        public PriceCalculatorService(StoreContext context)
        {
            _repo = new FillamentRepository(context);
        }
        public async Task<double> getModelVolume(string filePath)
        {
            var volume = await BinaryStlVolumeCalculator.CalculateVolume(filePath);
            return  volume;
        }

        public  async Task<double> calculatePrice(string filePath, int FilamentId, double fillingPercent)
        {
            double volume = await BinaryStlVolumeCalculator.CalculateVolume(filePath);
            var filament = await _repo.getByIdAsync(FilamentId);

            return volume / 10 * filament.Price * fillingPercent;

        }
        public async Task<double> calculatePrice(double Volume, int FilamentId, double fillingPercent)
        {
            
            var filament = await _repo.getByIdAsync(FilamentId);

            return Math.Round((Volume / 3000 * filament.Price * fillingPercent), 2);

        }
    }
}
