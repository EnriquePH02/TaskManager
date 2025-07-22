namespace TaskManager.DTOs
{
    public class CategoryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public List<TaskSimplifiedDTO> Tasks { get; set; } = new List<TaskSimplifiedDTO>();
    }
}