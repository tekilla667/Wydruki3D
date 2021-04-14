using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class OrderTestDTO
    {
        public string basketId { get; set; }
        public string deliveryMethod { get; set; }
        public OrderAddress addressForm { get; set; }

    }
}
