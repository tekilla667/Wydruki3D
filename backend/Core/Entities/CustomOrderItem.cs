using Core.Entities.OrderEntities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
   public class CustomOrderItem
    {
        public CustomOrderItem()
        {
        }

        public CustomOrderItem(string usersId, string modelName, int quantity, int filamentId, int filingPercent, int colorId, decimal price)
        {
            UsersId = usersId;
            ModelName = modelName;
            Quantity = quantity;
            FilamentId = filamentId;
            FilingPercent = filingPercent;
            ColorId = colorId;
            Price = price;
        }
        public int Id { get; set; }
        public string UsersId { get; set; }
        public string ModelName { get; set; }
        public int Quantity { get; set; }
        public int FilamentId { get; set; }
        public int FilingPercent { get; set; }
        public int ColorId { get; set; }
        public decimal Price { get; set; }
    }
}
