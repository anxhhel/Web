using Microsoft.AspNetCore.Identity;

namespace SushiRestaurant.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }
    }
}
