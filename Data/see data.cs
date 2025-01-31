using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace SushiRestaurant.Data
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider, UserManager<ApplicationUser> userManager)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            string[] roleNames = { "Admin", "Customer" };
            foreach (var roleName in roleNames)
            {
                var roleExist = roleManager.RoleExistsAsync(roleName).Result;
                if (!roleExist)
                {
                    var role = new IdentityRole(roleName);
                    var roleResult = roleManager.CreateAsync(role).Result;
                }
            }

            var adminUser = userManager.FindByEmailAsync("admin@sushi.com").Result;
            if (adminUser == null)
            {
                var user = new ApplicationUser { UserName = "admin@sushi.com", Email = "admin@sushi.com" };
                var result = userManager.CreateAsync(user, "Password123!").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "Admin").Wait();
                }
            }
        }
    }
}
