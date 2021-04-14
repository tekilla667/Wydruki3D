using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Helpers
{
    public class AdminUserList
    {
        public string Email { get; set; }
        public int OrdersCount { get; set; }
        public decimal OrdersValue { get; set; }
        public string LastOrderDate { get; set; }
    }
}