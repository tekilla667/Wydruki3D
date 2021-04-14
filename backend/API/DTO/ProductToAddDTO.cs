using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class ProductToAddDTO
    {

        public string Name { get; set; }

        public int Price { get; set; }
        public int TypeId { get; set; }
        public string Description { get; set; }
        public string PictureUrl { get; set; }
    }
}
