using Infrastructure.Context;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Interfaces;
using API.DTO;
using System.Linq.Expressions;
using System;
using Core.Helpers;

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
       public async Task<ActionResult<List<StoreProductDTO>>> GetProducts([FromQuery] QueryData data)
        {
            var products = await _repo.GetStoreProductsAsync(data);
            Console.WriteLine("prodId: " + data.prodId);
            Console.WriteLine("currentPageIndex: " + data.currentPageIndex);
            Console.WriteLine("maxPagescount: " + data.maxPagesCount);
            Console.WriteLine("priceSort: " + data.priceSort);
            Console.WriteLine("productsPerPage: " + data.productsPerPage);
            Console.WriteLine("typeIdSearch: " + data.typeIdSearch);
            Console.WriteLine("name: " + data.name);


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
        [HttpGet("all")]
        public async Task<ActionResult<List<StoreProductDTO>>> GetAllProducts()
        {
            var products = await _repo.GetAllStoreProductsAsync();
            var productsDTO = new List<StoreProductDTO>();
            foreach (var prod in products)
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