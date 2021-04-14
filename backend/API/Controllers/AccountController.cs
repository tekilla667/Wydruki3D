using API.DAO;
using API.DTO;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IEmailService _emailService;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService, IEmailService emailService)
        {
            _signInManager = signInManager;
            _tokenService = tokenService;
            _userManager = userManager;
            _emailService = emailService;
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var user = await _userManager.FindByEmailAsync(email);
            return new UserDTO
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            Console.WriteLine(email);
            return await _userManager.FindByEmailAsync(email) != null;
        }
        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDTO>> GetUserAddress()
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            

            var user = await _userManager.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email == email);
            return new AddressDTO { 
            FirstName = user.Address.FirstName,
            LastName = user.Address.LastName,
            Street = user.Address.Street,
            City = user.Address.City,
            PostCode = user.Address.PostCode
            };
        }
        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDTO>> UpdateUserAdress (AddressDTO address)
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var user = await _userManager.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email == email);
            user.Address.FirstName = address.FirstName;
            user.Address.LastName = address.LastName;
            user.Address.Street = address.Street;
            user.Address.City = address.City;
            user.Address.PostCode = address.PostCode;
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
                return Ok();
            else
                return BadRequest("Nie udalo sie");
            
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDto)
        {
             var user = await _userManager.FindByEmailAsync(loginDto.Email);
              if (user == null)
                  return Unauthorized();
            if (!user.EmailConfirmed)
                return Unauthorized();
              var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
              if (!result.Succeeded)
                  return Unauthorized();
              return new UserDTO
              {
                  Email = user.Email,
                  Token = _tokenService.CreateToken(user),
                  DisplayName = user.DisplayName,
                  isAdmin = user.isAdmin
              };
           
        }
        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            if (userId == null || token == null)
                return BadRequest("Niepoprawne parametry");
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return BadRequest("Nie znaleziono uzytkownika");
            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
                return Content("Adres email został potwierdzony");
            else
                return BadRequest("Wystapił błąd");
        }
        [HttpGet("ConfirmEmailChange")]
        public async Task<IActionResult> ConfirmEmailChange(string userId, string token, string newEmail)
        {
            if (userId == null || token == null)
                return BadRequest("Niepoprawne parametry");
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return BadRequest("Nie znaleziono uzytkownika");
            var result = await _userManager.ChangeEmailAsync(user, newEmail, token);
            if (result.Succeeded)
                return Content("Adres email został potwierdzony");
            else
                return BadRequest("Wystapił błąd");
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDTO registerDto)
        {
            if (CheckEmailExistsAsync(registerDto.Email).Result.Value)
            {
                return BadRequest("Uzytkownik o podanym adresie e-mail jest juz zarejestrowany");
            }
            
            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var confirmationLink = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, token = token }, Request.Scheme);
            _emailService.SendVerificationEmail(confirmationLink, registerDto.Email);
            Console.WriteLine("OTO LINK:  " + confirmationLink);
            if (!result.Succeeded) return BadRequest();
            return Ok();
        }
        [HttpGet("getAllUsedEmails")]
        public async Task<IEnumerable<UserEmailAddressDAO>> getAllEmails()
        {
            var users = await _userManager.Users.ToListAsync();
            List<UserEmailAddressDAO> emails = new List<UserEmailAddressDAO>();
            foreach (var user in users)
            {
                emails.Add(new UserEmailAddressDAO { 
                email = user.Email,
                Id = user.Id
                });
            }
            return emails;
        }
        [Authorize]
        [HttpPost("changeUserPassword")]
        public async Task<ActionResult> changeUserPassword(ChangePasswordDAO changePassword)
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var user = await _userManager.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email == email);
            var result = await _userManager.ChangePasswordAsync(user, changePassword.OldPassword, changePassword.NewPassword);
            if (result.Succeeded)
                return Ok();
            else
                return BadRequest();
        }
        [Authorize]
        [HttpPost("changeUserEmail")]
        public async Task<ActionResult> changeUserEmail(ChangeEmailDAO changeEmail)
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var user = await _userManager.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email == email);
            if (user == null)
                return BadRequest();
            var token = await _userManager.GenerateChangeEmailTokenAsync(user, changeEmail.NewEmail);
            var confirmationLink = Url.Action("ConfirmEmailChange", "Account", new { userId = user.Id, token = token, newEmail = changeEmail.NewEmail }, Request.Scheme);
            _emailService.SendEmailChangeConfirmation(confirmationLink, changeEmail.NewEmail);

            return Ok();
           
        }
        [Authorize]
        [HttpPut("deleteAccount")]
        public async Task<ActionResult> deleteUserAccount(PasswordDAO pw)
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var user = await _userManager.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email == email);
            if(await _userManager.CheckPasswordAsync(user, pw.Password))
            {
                var result = await _userManager.DeleteAsync(user);
                return Ok();
            }
            else
            {
                return BadRequest();
            }
            
        }



    }
}
