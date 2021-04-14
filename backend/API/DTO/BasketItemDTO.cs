using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class BasketItemDTO
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string ProductName { get; set; }
        [Required]
        [Range(0.1, double.MaxValue, ErrorMessage ="Cena musi byc wieksza od zera")]
        public int Price { get; set; }
        [Required]
        [Range(1, double.MaxValue, ErrorMessage ="Minimalna ilosc sztuk wynosi 1")]
        public int Quantity { get; set; }
        [Required]
        public string PictureUrl { get; set; }
        [Required]
        public int TypeId { get; set; }

    }
}
