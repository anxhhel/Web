using System.ComponentModel.DataAnnotations;

namespace RestaurantAPI.Models
{
    public class Special
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }
    }

    public class OpeningHour
    {
        [Key]
        public int Id { get; set; }
        public string Day { get; set; }
        public string OpenTime { get; set; }
        public string CloseTime { get; set; }
    }


}
