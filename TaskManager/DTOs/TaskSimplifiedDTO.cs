namespace TaskManager.DTOs
{
    public class TaskSimplifiedDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public bool IsDone {get; set; }
    }
}