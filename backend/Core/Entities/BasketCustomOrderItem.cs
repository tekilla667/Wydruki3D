using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class BasketCustomOrderItem
    {
        public string UsersId { get; set; }
        public string ModelName { get; set; }
        public int Quantity { get; set; }
        public int FilamentId { get; set; }
        public int FilingPercent { get; set; }
        public int ColorId { get; set; }
        public decimal Price { get; set; }
    }
}
