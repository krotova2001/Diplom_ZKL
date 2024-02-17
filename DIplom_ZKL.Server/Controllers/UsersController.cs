using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Xml.Linq;

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
       
        [Authorize]
        [HttpGet(Name = "users")]
        public IEnumerable<User> Get()
        {
            return _context.Users.ToArray();
        }

        // GET получить пользователя
        [Authorize]
        [HttpGet("{id}")]
        public IResult GetUser(Guid id)
        {
            // находим пользователя 
            User? person = _context.Users.FirstOrDefault(p => p.Id == id);
            // если пользователь не найден, отправляем статусный код 401
            if (person is null) return Results.Empty;
            return Results.Json(person);
        }
        
        //создать пользователя
        [Authorize]
        [HttpPost]
        public IResult CreateUser([FromBody] User newUser)
        {
            //тут придумать валидацию на null и некорректные данные
            _context.Users.Add(newUser);
            _context.SaveChanges();
            return Results.Json(newUser);
        }
        
        //обновить информацию о пользователе
        [Authorize]
        [HttpPut("{id}")]
        public IResult Put(Guid id, [FromBody] string value)
        {
            //тут придумать валидацию на null и некорректные данные

            return Results.Ok();
        }

        // удалить пользователя
        [Authorize]
        [HttpDelete("{id}")]
        public IResult Delete(Guid id)
        {
            // находим пользователя 
            User? person = _context.Users.FirstOrDefault(p => p.Id == id);
            if (person is null) return Results.Empty;
            _context.Users.Remove(person);
            _context.SaveChanges();
            return Results.Ok();
        }
    }
}
