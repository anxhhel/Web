using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SushiRestaurant.Data;
using SushiRestaurant.Models;
using System.Linq;
using System.Threading.Tasks;

namespace SushiRestaurant.Controllers
{
    [Authorize]
    public class OrdersController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Orders/Create
        public IActionResult Create()
        {
            var menuItems = _context.MenuItems.ToList();
            return View(menuItems);
        }

        // POST: Orders/Create
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromForm] int[] menuItemIds, [FromForm] int[] quantities)
        {
            if (menuItemIds.Length != quantities.Length)
            {
                return BadRequest("Mismatch in menu items and quantities.");
            }

            var order = new Order
            {
                UserID = User.Identity.Name,
                OrderDate = DateTime.Now,
                Status = "Pending",
                OrderDetails = new List<OrderDetail>()
            };

            for (int i = 0; i < menuItemIds.Length; i++)
            {
                var menuItem = await _context.MenuItems.FindAsync(menuItemIds[i]);

                if (menuItem != null)
                {
                    order.OrderDetails.Add(new OrderDetail
                    {
                        MenuItemID = menuItem.MenuItemID,
                        Quantity = quantities[i],
                        TotalPrice = quantities[i] * menuItem.Price
                    });
                }
            }

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return RedirectToAction("MyOrders");
        }

        // GET: Orders/MyOrders
        public IActionResult MyOrders()
        {
            var userId = User.Identity.Name;
            var orders = _context.Orders
                .Where(o => o.UserID == userId)
                .OrderByDescending(o => o.OrderDate)
                .ToList();

            return View(orders);
        }
    }
}
