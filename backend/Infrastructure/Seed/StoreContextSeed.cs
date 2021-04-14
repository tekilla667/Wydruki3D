using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq.Expressions;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Infrastructure.Context;
using Core.Entities;

namespace Infrastructure.Seed
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync (StoreContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if(!context.StoreProducts.Any())
                {
                    var Data = File.ReadAllText("../Infrastructure/Seed/Data/storeproducts.json");
                    var products = JsonSerializer.Deserialize<List<StoreProduct>>(Data);
                    foreach( var item in products)
                    {
                        context.StoreProducts.Add(item);
                    }
                    await context.SaveChangesAsync();
                }
                
            }
            catch(Exception ex)
            {
                var logger = loggerFactory.CreateLogger<StoreContextSeed>();
                logger.LogError(ex.Message);
            }
        }
    }
}
