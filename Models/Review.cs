using System;
using System.ComponentModel.DataAnnotations;

namespace ReviewAPI.Models
{
    public class Review
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public required string Username { get; set; }  // Use required 

        [Required]
        public required string ReviewText { get; set; } // Use required 

        [Required]
        [Range(1, 5)]
        public int Rating { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}