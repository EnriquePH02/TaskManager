using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Data;
using TaskManager.Models;
using TaskManager.DTOs;

namespace TaskManager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoriesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategorySimplifiedDTO>>> GetCategories()
        {
            var categories = await _context.Categories
                .Select(c => new CategorySimplifiedDTO
                {
                    Id = c.Id,
                    Name = c.Name
                })
                .ToListAsync();

            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDTO>> GetCategory(int id)
        {
            var category = await _context.Categories
                .Where(c => c.Id == id)
                .Include(c => c.Tasks)
                .Select(c => new CategoryDTO
                {
                    Id = c.Id,
                    Name = c.Name,
                    Tasks = c.Tasks.Select(t => new TaskSimplifiedDTO
                    {
                        Id = t.Id,
                        Title = t.Title,
                        IsDone = t.IsDone
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (category == null)
                return NotFound();

            return Ok(category);
        }

        [HttpPost]
        public async Task<ActionResult<CategorySimplifiedDTO>> CreateCategory(InputCategoryDTO categoryDTO)
        {
            var category = new Category
            {
                Name = categoryDTO.Name
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            var resultDTO = new CategorySimplifiedDTO
            {  
                Id = category.Id,
                Name = category.Name
            };

            return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, resultDTO);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, InputCategoryDTO categoryDTO)
        {
            var category = await _context.Categories.FindAsync(id);

            if(category==null){
                return NotFound();
            }

            category.Name = categoryDTO.Name;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if(category==null){
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
