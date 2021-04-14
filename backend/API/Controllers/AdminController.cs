using API.DTO;
using Core.Entities;
using Core.Entities.OrderEntities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using API.DAO;
using Microsoft.AspNetCore.Identity;
using Core.Helpers;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;
        private readonly IEmailService _emailService;

        public AdminController(IOrderService orderService, IUnitOfWork unitofWork, UserManager<AppUser> userManager, IEmailService email)
        {
            _emailService = email;
            _userManager = userManager;
            _unitOfWork = unitofWork;
            _orderService = orderService;
        }
        [HttpGet("lastMonth")]
        public Task<IReadOnlyList<decimal>> lastMonthOrders()
        {
            return _orderService.GetEarningsFromLastMonthAsync();
        }
        [HttpGet("latest")]
        public async Task<IReadOnlyList<Order>> GetLastOrders()
        {
            return await _orderService.GetLastTenOrders();
        }
        [HttpPost("addNewProduct")]
        public async Task<ActionResult> AddNewProduct(ProductToAddDTO newProduct)
        {

            _unitOfWork._products.Add(new StoreProduct
            {
                Description = newProduct.Description,
                Name = newProduct.Name,
                PictureUrl = newProduct.PictureUrl,
                TypeId = newProduct.TypeId,
                Price = newProduct.Price
            });
            var complete = await _unitOfWork.Complete();
            if (complete == 1)
            {
                return Ok();
            }
            else
                return BadRequest();
            
        }
        [HttpPost("addNewDeliveryMethod")]
        public async Task<ActionResult> AddNewDeliveryMethod(DeliveryMethodDTO newMethod)
        {
            _unitOfWork._deliveryMethods.Add(new DeliveryMethod
            {
                DeliveryTime = newMethod.DeliveryTime,
                Description = newMethod.Description,
                Name = newMethod.Name,
                Price = decimal.Parse(newMethod.Price)
            });
            var result = await _unitOfWork.Complete();
            if (result == 1)
            {
                return Ok();
            }
            else
                return BadRequest();

        }
        [HttpDelete("deleteDelivery/{id}")]
        public async Task<ActionResult> DeleteDeliveryMethod(int id)
        {
            var delivery = _unitOfWork._deliveryMethods.GetById(id);
            _unitOfWork._deliveryMethods.Remove(delivery);
            var result = await _unitOfWork.Complete();
            if (result == 1)
            {
                return Ok();
            }
            else
                return BadRequest();
        }
        [HttpGet("getOrdersWithSkip/{id}")]
        public async Task<IEnumerable<Order>> GetOrdersWithSkip(int id)
        {
            var orders = await _unitOfWork.GetTenOrdersWithSkip(id);
            orders = orders.Reverse();
            return orders.Skip(10 * id).Take(10);
        }

        [HttpPost("updateOrderStatus")]
        public async Task<ActionResult> updateOrderStatus(OrderToUpdateDAO orderUpdate)
        {
           
            var result = await _unitOfWork.ChangeOrderStatus(orderUpdate.NewStatus, orderUpdate.OrderId);
            
            if (result == 1)
            {
                var order = _unitOfWork._orders.GetById(orderUpdate.OrderId);

                _emailService.SendOrderUpdateEmail(orderUpdate.OrderId, order.BuyerEmail, orderUpdate.NewStatus.ToString());
                return Ok();
            }
            else
                return BadRequest();
        }
        [HttpGet("getUsersOrders/{id}")]
        public async Task<IEnumerable<Order>> getUsersOrders(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            var result = await _unitOfWork.GetOrdersFromUser(user.Email);
            return result;
        }
        [HttpGet("usersList")]
        public async Task<IEnumerable<AdminUserList>> getUsers()
        {
            return await _orderService.GetAdminUserList();
        }
        [HttpDelete("user/{id}")]
        public async Task<ActionResult> deleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            var result = await _userManager.DeleteAsync(user);
            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
        [Authorize]
        [HttpGet("bearerOrders")]
        public async Task<IEnumerable<Order>> getBearerOrders()
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var user = await _userManager.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email == email);
            var orders = await _unitOfWork.GetOrdersFromUser(user.Email);
            return orders;
        }

    }
}
