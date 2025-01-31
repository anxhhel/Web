using Microsoft.AspNetCore.Mvc;
using RestaurantAPI.Data;
using RestaurantAPI.Models;
using System.Collections.Generic;
using System.Linq;

namespace RestaurantAPI.Controllers
{
    [Route("api/opening-hours")]
    [ApiController]
    public class OpeningHoursController : ControllerBase
    {
        private readonly RestaurantDbContext _context;

        public OpeningHoursController(RestaurantDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<OpeningHour>> GetOpeningHours()
        {
            return _context.OpeningHours.ToList();
        }

        [HttpPut]
        public IActionResult UpdateOpeningHours([FromBody] List<OpeningHour> updatedHours)
        {
            if (updatedHours == null || !updatedHours.Any())
                return BadRequest("Invalid data");

            foreach (var hour in updatedHours)
            {
                var existing = _context.OpeningHours.FirstOrDefault(o => o.Day == hour.Day);
                if (existing != null)
                {
                    existing.OpenTime = hour.OpenTime;
                    existing.CloseTime = hour.CloseTime;
                }
            }

            _context.SaveChanges();
            return Ok("Opening hours updated");
        }
    }
}
