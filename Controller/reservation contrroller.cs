using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SushiRestaurant.Models;

namespace SushiRestaurant.Controllers
{
    [Authorize]
    public class ReservationsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ReservationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Reservations/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Reservations/Create
        [HttpPost]
        public IActionResult Create(Reservation reservation)
        {
            if (ModelState.IsValid)
            {
                reservation.Status = "Pending";
                reservation.UserID = User.Identity.Name; // Assumes email is used as username
                _context.Reservations.Add(reservation);
                _context.SaveChanges();
                return RedirectToAction("Index", "Home");
            }
            return View(reservation);
        }

        // GET: Reservations/MyReservations
        public IActionResult MyReservations()
        {
            var reservations = _context.Reservations.Where(r => r.UserID == User.Identity.Name).ToList();
            return View(reservations);
        }
    }
}
