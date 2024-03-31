using DIplom_ZKL.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DIplom_ZKL.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatementController : ControllerBase
    {
        private readonly DiplomContext _context;

        public StatementController()
        {
            _context = new DiplomContext();
        }

        // GET: api/statements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Statement>>> GetStatements()
        {
            return await _context.Statements.ToListAsync();
        }
    }
}
