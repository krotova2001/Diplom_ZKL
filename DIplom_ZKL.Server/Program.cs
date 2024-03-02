using DIplom_ZKL.Server;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static DIplom_ZKL.Server.User;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddCors(); // добавляем сервисы CORS
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)

.AddJwtBearer(options =>
 {
     options.TokenValidationParameters = new TokenValidationParameters
     {
         // указывает, будет ли валидироваться издатель при валидации токена
         ValidateIssuer = true,
         // строка, представляющая издателя
         ValidIssuer = AuthOptions.ISSUER,
         // будет ли валидироваться потребитель токена
         ValidateAudience = true,
         // установка потребителя токена
         ValidAudience = AuthOptions.AUDIENCE,
         // будет ли валидироваться время существования
         ValidateLifetime = true,
         // установка ключа безопасности
         IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
         // валидация ключа безопасности
         ValidateIssuerSigningKey = true,
     };
 });

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.UseAuthentication();
app.UseAuthorization();

// настраиваем CORS
app.UseCors(builder => builder.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod());


app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();


