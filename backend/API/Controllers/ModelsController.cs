using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ModelsController : ControllerBase
    {
        private readonly IWebHostEnvironment _environment;

        public ModelsController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        [HttpGet]

        public PhysicalFileResult DownloadFile([FromQuery]string modelToken, [FromQuery]string id)
        {
            DirectoryInfo searchDir = new DirectoryInfo(_environment.ContentRootPath + "/wwwroot/customusermodels/" + id);            
            FileInfo[] file = searchDir.GetFiles("*" + @modelToken + "*.*");
            string fullName = "";
            foreach (FileInfo foundFile in file)
            {
                 fullName = foundFile.FullName;
            }
            return new PhysicalFileResult(fullName, "application/vnd.ms-pki.stl");
           
        }
       
    }
}
