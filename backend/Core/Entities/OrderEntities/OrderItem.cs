using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class OrderItem
    {
        public OrderItem()
        {
        }

        public OrderItem(ProductItemOrdered itemOrdered, decimal price, int quantity)
        {
            ItemOrdered = itemOrdered;
            Price = price;
            Quantity = quantity;
        }

        public int Id { get; set; }
        public ProductItemOrdered ItemOrdered { get; set; }
        public decimal Price { get; set; }
        public  int Quantity { get; set; }
    }
}
