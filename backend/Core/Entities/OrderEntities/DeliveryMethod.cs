using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class DeliveryMethod
    {
        public DeliveryMethod()
        {
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string DeliveryTime { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
    }
}
