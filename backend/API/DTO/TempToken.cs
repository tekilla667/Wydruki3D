using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class TempToken
    {
        public TempToken(string token, string userId)
        {
            this.token = token;
            this.userId = userId;
        }

        public string token { get; set; }
        public string userId { get; set; }
    }
}
