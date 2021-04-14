using Core.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Pawel",
                    Email = "pawel@test.com",
                    UserName = "Uzytkownik",
                    Address = new Address
                    {
                        Id = 1,
                        FirstName = "Pawel",
                        LastName = "Pawlowski",
                        Street = "Ulica",
                        City = "Miasto",
                        PostCode = "00-000",
                        AppUserId = "userId",
                    }
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}
