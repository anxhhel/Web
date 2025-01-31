using System;
using System.Collections.Generic;

namespace SushiRestaurant.Models
{
    public class Order
    {
        public int OrderID { get; set; }
        public string UserID { get; set; } // Link to the user
        public DateTime OrderDate { get; set; }
        public string Status { get; set; } // Pending, Confirmed, Delivered

        public List<OrderDetail> OrderDetails { get; set; }
    }
}
