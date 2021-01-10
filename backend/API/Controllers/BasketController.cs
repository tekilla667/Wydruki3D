
using API.DTO;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BasketController : ControllerBase
    {
        private readonly IBasketRepository _basketRepository;

        public BasketController(IBasketRepository basketRepository)
        {
            _basketRepository = basketRepository;
        }
        [HttpGet]
        public async Task<ActionResult<Basket>> GetBasketById(string id)
        {
            var basket = await _basketRepository.GetBasketAsync(id);
            return Ok(basket ?? new Basket(id));
        }
        [HttpPost]
        public async Task<ActionResult<Basket>> UpdateBasket(BasketDTO basketDTO)
        {
            List<BasketItem> items = new List<BasketItem>();
            foreach(BasketItemDTO itemek in basketDTO.BasketItems)
            {
                items.Add(new BasketItem
                {
                    Id = itemek.Id,
                    ProductName = itemek.ProductName,
                    Price = itemek.Price,
                    Quantity = itemek.Quantity,
                    PictureUrl = itemek.PictureUrl,
                    TypeId = itemek.TypeId
                });

            }
            var basketchecked = new Basket
            {
                Id = basketDTO.Id,
                BasketItems = items
            };

            var updatedBasket = await _basketRepository.UpdateBasketAsync(basketchecked);
            return Ok(updatedBasket);
        }
        [HttpDelete]
        public async Task DeleteBasketAsync(string id)
        {
            await _basketRepository.DeleteBasketAsync(id);
        }
    }
}

