using API.DTO;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class CustomOrderController : ControllerBase
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly UserManager<AppUser> _userManager;
        private readonly IPriceCalculatorService _priceCalculatorService;
        private readonly IModelVolumeRepository _modelVolumeRepository;
       

        public CustomOrderController(IWebHostEnvironment webHostEnvironment, UserManager<AppUser> manager, 
            IPriceCalculatorService priceCalculatorService, IModelVolumeRepository modelVolumeRepository)
        {
            _modelVolumeRepository = modelVolumeRepository;
            _priceCalculatorService = priceCalculatorService;
            _webHostEnvironment = webHostEnvironment;
            _userManager = manager;
        }
        [HttpPost]
        public async Task<ActionResult<TempToken>> UploadModel()
        {
            string modelName = null;
            var httpRequest = HttpContext.Request;
            var postedModel = httpRequest.Form.Files["model"];
            string token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
            token = token.Replace(Convert.ToChar(47), 'X');
            token = token.Replace(Convert.ToChar(92), 'X');
            token = token.Replace('+', 'X');
            if (postedModel != null)
            {
                var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
                var user = await _userManager.FindByEmailAsync(email);
                string folder = Path.Combine(_webHostEnvironment.WebRootPath, "customusermodels", user.Id);
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }
                Regex.Replace(postedModel.FileName, @"\s+", "");
                modelName = token + postedModel.FileName;
                string filePath = Path.Combine(folder, modelName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    postedModel.CopyTo(fileStream);
                }
                  
                
                return new TempToken(token, user.Id);
            }
            return BadRequest();
        }
        [HttpPost("price")]

        public async Task<ActionResult<double>> CalculatePrice(CustomOrderDTO customOrderDTO)
        {
            var volume = await _modelVolumeRepository.getModelVolume(customOrderDTO.modelId);

            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var user = await _userManager.FindByEmailAsync(email);
            if (volume == -1)
            {
                string folder = Path.Combine(_webHostEnvironment.WebRootPath, "customusermodels", user.Id);
                string fileName = customOrderDTO.modelId;
                string filePath = Path.Combine(folder, fileName);
                volume = await _priceCalculatorService.getModelVolume(filePath);
                await _modelVolumeRepository.addModelVolume(new ModelVolumes
                {
                    Id = customOrderDTO.modelId,
                    Volume = volume
                });
            }
           
           
            var price = await _priceCalculatorService.
                  calculatePrice(volume, customOrderDTO.FilamentId, customOrderDTO.fillingPercent);
            Console.WriteLine("OTO CENA:");
            Console.WriteLine(price);
            return price;
        }
    }
}
