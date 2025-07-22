using System.ComponentModel.DataAnnotations;

namespace TaskManager.DTOs
{
    public class InputTaskDTO
    {
        [Required]
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public bool IsDone { get; set; }
    }
}