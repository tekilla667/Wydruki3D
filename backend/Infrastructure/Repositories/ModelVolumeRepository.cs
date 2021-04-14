using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class ModelVolumeRepository : IModelVolumeRepository
    {
        private readonly IDatabase _database;

        public ModelVolumeRepository(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }
        public async Task<double> getModelVolume(string id)
        {
            var model = await _database.StringGetAsync(id);
            return model.IsNullOrEmpty ? -1 : Convert.ToDouble(model.ToString());
        }
        public async Task<double> addModelVolume(ModelVolumes model)
        {
            var created = await _database.StringSetAsync(model.Id, model.Volume, TimeSpan.FromDays(30));
            if (!created)
                return -1;
            return await getModelVolume(model.Id);
        }

       
    }
}
