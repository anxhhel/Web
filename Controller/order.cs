using System;
using System.Collections.Generic;

namespace SushiRestaurant.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public string CustomerId { get; set; }
        public ApplicationUser Customer { get; set; } // Navigation property

        public DateTime OrderDate { get; set; }
        public string OrderStatus { get; set; } // Example statuses: "Pending", "Completed", "Canceled"
        public decimal TotalAmount { get; set; }

        public ICollection<OrderItem> OrderItems { get; set; } // Navigation property
    }
}
