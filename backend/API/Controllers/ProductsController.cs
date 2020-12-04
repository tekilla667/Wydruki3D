using Infrastructure.Context;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Interfaces;
using API.DTO;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IStoreProductRepository _repo;

        public ProductsController(IStoreProductRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
       public async Task<ActionResult<List<StoreProductDTO>>> GetProducts()
        {
            var products = await _repo.GetStoreProductsAsync();
            var productsDTO = new List<StoreProductDTO>();
            foreach(var prod in products)
            {
                productsDTO.Add(new StoreProductDTO
                {
                    Id = prod.Id,
                    Name = prod.Name,
                    Description = prod.Description,
                    PictureUrl = "https://localhost:5001/" + prod.PictureUrl,
                    TypeId = prod.TypeId,
                    Price = prod.Price
                });
            }
            return Ok(productsDTO);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StoreProductDTO>> GetProductById(int id)
        {
            var prod = await _repo.GetStoreProductByIdAsync(id);
            return new StoreProductDTO
            {
                Id = prod.Id,
                Name = prod.Name,
                Description = prod.Description,
                PictureUrl = "https://localhost:5001/" + prod.PictureUrl,
                TypeId = prod.TypeId,
                Price = prod.Price
            };
        }
    }
}