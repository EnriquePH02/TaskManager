namespace TaskManager.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public bool IsDone { get; set; }

        public int CategoryId { get; set; }

        public Category? Category { get; set; }
    }
}
