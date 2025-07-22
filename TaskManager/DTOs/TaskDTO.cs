namespace TaskManager.DTOs
{
    public class TaskDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public bool IsDone { get; set; }
        public int CategoryId { get; set; }
    }
}
