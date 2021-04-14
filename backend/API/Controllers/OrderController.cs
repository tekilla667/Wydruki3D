using Core.Entities.OrderEntities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Core.Entities;
using API.DTO;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly UserManager<AppUser> _userManager;

        public OrderController(IOrderService orderService, UserManager<AppUser> manager)
        {
            _userManager = manager;
            _orderService = orderService;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> PlaceOrder(OrderTestDTO orderTest)
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var user = await _userManager.FindByEmailAsync(email);
            var order = _orderService.CreateOrderAsync(email, Int32.Parse(orderTest.deliveryMethod), orderTest.basketId, orderTest.addressForm);
            return await order;
        }
        [HttpGet("deliveries")]
        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethods()
        {
            return await _orderService.GetDeliveryMethodsAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrderByIdAsync(int id)
        {
            return await _orderService.GetOrderByIdAsync(id, "wat");
        }
      
    }
}
