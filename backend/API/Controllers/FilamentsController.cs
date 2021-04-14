using Core.Entities;
using Core.Interfaces;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FilamentsController : ControllerBase
    {
        private readonly IFillamentRepository _filamentRepository;

        public FilamentsController(IFillamentRepository filamentRepository)
        {
            _filamentRepository = filamentRepository;
        }

        [HttpGet]
        public async Task<IReadOnlyList<Filaments>> GetFillaments()
        {
            return await _filamentRepository.ListAllAsync();
        }

        
    }
}
