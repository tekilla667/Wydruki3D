using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IModelVolumeRepository
    {
        Task<double> getModelVolume(string id);
        Task<double> addModelVolume(ModelVolumes model);
    }
}
