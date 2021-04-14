using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class BasketDTO
    {
        public string Id { get; set; }
        public List<BasketItemDTO> BasketItems { get; set; } = new List<BasketItemDTO>();
        public List<BasketCustomOrderItem> CustomOrderItems { get; set; } = new List<BasketCustomOrderItem>();
    }
}
