using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using DIplom_ZKL.Server;

namespace DIplom_ZKL.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private readonly DiplomContext _context;

        public UsersController(ILogger<UsersController> logger)
        {
            _logger = logger;
            _context = new DiplomContext();
        }

        [HttpGet(Name = "users")]
        public IEnumerable<User> Get()
        {
            return _context.Users.ToArray();
        }

    }
}
