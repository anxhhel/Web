using Microsoft.AspNetCore.Mvc;
using RestaurantAPI.Data;
using RestaurantAPI.Models;
using System.Collections.Generic;
using System.Linq;

namespace RestaurantAPI.Controllers
{
    [Route("api/specials")]
    [ApiController]
    public class SpecialsController : ControllerBase
    {
        private readonly RestaurantDbContext _context;

        public SpecialsController(RestaurantDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Special>> GetSpecials()
        {
            return _context.Specials.ToList();
        }
    }
}
