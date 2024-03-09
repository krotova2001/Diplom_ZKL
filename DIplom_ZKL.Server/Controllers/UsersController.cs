using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Xml.Linq;
using System.Net;
using NuGet.Packaging.Signing;
using Microsoft.AspNetCore.Hosting;

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

        //загрузить новое фото пользователя
        [Authorize]
        [HttpPost("uploadphoto/{id}")]
        public async Task<HttpResponseMessage> PostUserImage(Guid id)
        {
            var idd = HttpContext.User.Identity;
            Dictionary<string, object> dict = new Dictionary<string, object>();
            try
            {
                var httpRequest = HttpContext.Request;
                var postedFile = httpRequest.Form.Files;
                if (postedFile != null && postedFile[0].Length > 0)
                {
                    string serverFolder = Path.Combine("", $"photo_{id}.jpg");
                    await postedFile[0].CopyToAsync(new FileStream(serverFolder, FileMode.Create));
                }
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.NotModified);
            }
        }

        //обновить информацию о пользователе
        [Authorize]
        [HttpPut("{id}")]
        public IResult Put(Guid id, User value)
        {
            //тут продумать нормально
            var result = _context.Users.SingleOrDefault(p => p.Id == id);   
            if (result != null)
            {
                //result = value - такая шняга тут не проходит, не сохраняет так
                result.Telegramlogin = value.Telegramlogin;
                result.Email = value.Email;
                result.Surname = value.Surname;
                result.Name = value.Name;
                result.Biography = value.Biography;
                result.TimeZone = value.TimeZone;
                result.PictureUrl = @$"/wwwroot/photo_{result.Id}.jpg";
                _context.SaveChanges();
                return Results.Ok();
            }
            else
                return Results.NotFound();
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
