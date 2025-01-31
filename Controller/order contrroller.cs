using Microsoft.AspNetCore.Mvc;
using SushiRestaurant.Models;
using SushiRestaurant.Data;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;

namespace SushiRestaurant.Controllers
{
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public OrderController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: Order/Details/5 (View a customer's order)
        public async Task<IActionResult> Details(int id)
        {
            var order = await _context.Orders
                .Where(o => o.OrderId == id)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.MenuItem)
                .FirstOrDefaultAsync();

            if (order == null)
            {
                return NotFound();
            }

            return View(order);
        }

        // POST: Order/Create (Customer places an order)
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(int[] menuItemIds, int[] quantities)
        {
            if (menuItemIds.Length != quantities.Length)
            {
                return BadRequest("Menu items and quantities count mismatch.");
            }

            var customer = await _userManager.GetUserAsync(User);

            var order = new Order
            {
                CustomerId = customer.Id,
                OrderDate = DateTime.Now,
                OrderStatus = "Pending",
                OrderItems = menuItemIds.Select((id, index) => new OrderItem
                {
                    MenuItemId = id,
                    Quantity = quantities[index],
                    ItemPrice = _context.MenuItems.FirstOrDefault(m => m.MenuItemId == id).Price
                }).ToList()
            };

            order.TotalAmount = order.OrderItems.Sum(oi => oi.TotalPrice);

            _context.Add(order);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Details), new { id = order.OrderId });
        }

        // Admin Action: GET all orders (for order management)
        public IActionResult AllOrders()
        {
            var orders = _context.Orders
                .Include(o => o.Customer)
                .OrderByDescending(o => o.OrderDate)
                .ToList();

            return View(orders);
        }

        // Admin Action: Update Order Status (e.g., to "Completed")
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> UpdateOrderStatus(int orderId, string status)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order != null)
            {
                order.OrderStatus = status;
                _context.Update(order);
                await _context.SaveChangesAsync();
            }

            return RedirectToAction(nameof(AllOrders));
        }
    }
}
