using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class Basket
    {
        public Basket(string id)
        {
            Id = id;
        }
        public Basket()
        {
          
        }

        public string Id { get; set; }
        public List<BasketItem> BasketItems { get; set; } = new List<BasketItem>();
    }
}
