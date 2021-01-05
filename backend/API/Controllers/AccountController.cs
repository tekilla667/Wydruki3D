using API.DTO;
using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDto)
        {
             var user = await _userManager.FindByEmailAsync(loginDto.Email);
              if (user == null)
                  return Unauthorized();
              var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
              if (!result.Succeeded)
                  return Unauthorized();
              return new UserDTO
              {
                  Email = user.Email,
                  Token = "this will be token",
                  DisplayName = user.DisplayName
              };
           
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDto)
        {
            var user = new User
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email
            };
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded) return BadRequest();
            return new UserDTO
            {
                DisplayName = user.DisplayName,
                Token = "This will be a token",
                Email = user.Email
            };
        }



    }
}
