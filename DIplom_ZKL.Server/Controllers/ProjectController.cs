using DIplom_ZKL.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DIplom_ZKL.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly DiplomContext _context;

        public ProjectController ()
        {
            _context = new DiplomContext();
        }

        // получить проекты, в которых задействован тот, кто запрашивает
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Project>>>Get(Guid id)
        {
            User? person = _context.Users.FirstOrDefault(person => person.Id == id);
            
            if (person is null) return BadRequest();

            return await _context.Projects.Include(project => project.TaskitemNavigation).Include(u => u.UserNavigation)
                .Where(project => project.UserNavigation.Contains(person))
                .ToListAsync();
        }
        
        //получить все проекты вообще
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetAll()
        {
            return await _context.Projects.Include(p => p.TaskitemNavigation).Include(u=>u.UserNavigation)
                .ToListAsync();
        }
        
        // GET api/<ProjectController>/5
        [HttpGet("/Detail/{id}")]
        public async Task<ActionResult<Project>> GetOne(Guid id)
        {
            return await _context.Projects.Include(p => p.TaskitemNavigation).Include(u => u.UserNavigation).FirstOrDefaultAsync(p => p.Id == id);
        }

        // POST api/<ProjectController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ProjectController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ProjectController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
