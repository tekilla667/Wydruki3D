using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class DeliveryMethodDTO
    {
        public string Name { get; set; }
        public string DeliveryTime { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
    }
}
