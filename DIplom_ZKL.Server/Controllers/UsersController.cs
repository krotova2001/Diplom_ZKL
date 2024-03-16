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
using System.IO;
using DIplom_ZKL.Server.Models;

namespace DIplom_ZKL.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private readonly DiplomContext _context;
        private readonly IWebHostEnvironment _env;

        public UsersController(ILogger<UsersController> logger, IWebHostEnvironment env)
        {
            _logger = logger;
            _context = new DiplomContext();
            _env = env; // окружение, чтоб иметь досутп к путям на диске и сохранять файлы
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
            newUser.Id = new Guid();
            //тут придумать валидацию на null и некорректные данные
            _context.Users.Add(newUser);
            _context.SaveChanges();
            return Results.Json(newUser);
        }

        //загрузить новое фото пользователя
        
        [HttpPost("uploadphoto")]
        public async Task<HttpResponseMessage> PostUserImage(IFormFile file)
        {
            Guid userid = Guid.Parse(HttpContext.Request.Form["id"]);
            var user = _context.Users.SingleOrDefault(p => p.Id == userid);
            if (user != null)
            {
                try
                {
                    if (file != null)
                    {
                        string serverFolder = @$"userphotos\photo_{userid}.jpg";
                        //user.PictureUrl = serverFolder;
                        //_context.SaveChanges();
                        await file.CopyToAsync(new FileStream(Path.Combine(_env.WebRootPath, serverFolder), FileMode.Create));

                        return new HttpResponseMessage(HttpStatusCode.OK);
                    }
                    else
                    {
                        return new HttpResponseMessage(HttpStatusCode.NotModified);
                    }
                }
                catch
                {
                    return new HttpResponseMessage(HttpStatusCode.NotModified);
                }
            }
            else { return new HttpResponseMessage(HttpStatusCode.NotModified);}
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
