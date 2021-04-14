using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DAO
{
    public class OrderToUpdateDAO
    {

        public int OrderId { get; set; }
        public OrderStatus NewStatus { get; set; }
    }
}
