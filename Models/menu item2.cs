namespace SushiRestaurant.Models
{
    public class MenuItem
    {
        public int MenuItemId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; } // e.g., "Sushi", "Sashimi", "Drink", etc.

        public ICollection<OrderItem> OrderItems { get; set; } // Navigation property
    }
}
