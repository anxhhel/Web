namespace SushiRestaurant.Models
{
    public class OrderItem
    {
        public int OrderItemId { get; set; }
        public int OrderId { get; set; } // Foreign key to Order
        public Order Order { get; set; } // Navigation property

        public int MenuItemId { get; set; } // Foreign key to MenuItem
        public MenuItem MenuItem { get; set; } // Navigation property

        public int Quantity { get; set; }
        public decimal ItemPrice { get; set; }
        public decimal TotalPrice => Quantity * ItemPrice;
    }
}
