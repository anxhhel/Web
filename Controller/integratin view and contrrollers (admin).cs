public IActionResult Menu()
{
    var menuItems = _context.MenuItems.ToList();
    return View(menuItems);  // Pass menu items to the view
}
