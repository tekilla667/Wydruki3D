using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class User : IdentityUser
    {
        public string DisplayName { get; set; }
        public Address Address { get; set; }
    }
}
