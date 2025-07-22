using System.ComponentModel.DataAnnotations;

namespace TaskManager.DTOs
{
    public class InputCategoryDTO
    {
        [Required]
        public string Name { get; set; } = null!;
        
    }
}
