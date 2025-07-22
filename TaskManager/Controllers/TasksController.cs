using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Data;
using TaskManager.Models;
using TaskManager.DTOs;

namespace TaskManager.Controllers
{
    [ApiController]
    [Route("api/categories/{categoryId}/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskDTO>> GetTask(int categoryId, int id)
        {
            var task = await _context.Tasks
                .Where(c => c.Id == id)
                .Where(c => c.CategoryId == categoryId)
                .Select(c => new TaskDTO
                {
                    Id = c.Id,
                    Title = c.Title,
                    Description = c.Description,
                    IsDone = c.IsDone,
                    CategoryId = c.CategoryId
                })
                .FirstOrDefaultAsync();

            return task == null ? NotFound() : task;
        }

        [HttpPost]
        public async Task<ActionResult<TaskSimplifiedDTO>> CreateTask(int categoryId, InputTaskDTO taskDTO)
        {
            var task = new TaskItem
            {
                Title = taskDTO.Title,
                Description = taskDTO.Description,
                IsDone = taskDTO.IsDone,
                CategoryId = categoryId
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            var resultDTO = new TaskSimplifiedDTO
            {
                Id = task.Id,
                Title = task.Title,
                IsDone = task.IsDone
            };

            return CreatedAtAction(nameof(GetTask), new { id = task.Id, categoryId }, resultDTO);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int categoryId, int id, InputTaskDTO taskDTO)
        {
            var task = await _context.Tasks
                .Where(c => c.Id == id)
                .Where(c => c.CategoryId == categoryId)
                .FirstOrDefaultAsync();

            if (task == null) return NotFound();

            task.Title = taskDTO.Title;
            task.Description = taskDTO.Description;
            task.IsDone = taskDTO.IsDone;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int categoryId, int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null || task.CategoryId != categoryId) return NotFound();

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
