using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IPriceCalculatorService
    {
        Task<double>  calculatePrice(string filePath, int FilamentId, double fillingPercent);
        Task<double> calculatePrice(double Volume, int FilamentId, double fillingPercent);
        Task<double> getModelVolume(string filePath);
    }
}
