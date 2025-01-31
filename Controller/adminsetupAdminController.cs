[Authorize(Policy = "AdminPolicy")]  // Only Admin users can access these actions
public class AdminController : Controller
{
    private readonly ApplicationDbContext _context;

    public AdminController(ApplicationDbContext context)
    {
        _context = context;
    }

    // View menu items (only accessible to Admin)
    public IActionResult Menu()
    {
        var menuItems = _context.MenuItems.ToList();
        return View(menuItems);
    }
}
