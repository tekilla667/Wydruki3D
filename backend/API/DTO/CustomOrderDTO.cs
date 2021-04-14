using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class CustomOrderDTO
    {
       
            public string modelId { get; set; }
            public int FilamentId { get; set; }
            public double fillingPercent { get; set; }
    }
}
