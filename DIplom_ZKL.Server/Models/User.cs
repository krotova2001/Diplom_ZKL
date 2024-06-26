﻿using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DIplom_ZKL.Server.Models;

/// <summary>
/// Пользователи системы
/// </summary>
public partial class User
{
    [Key]
    public Guid Id { get; set; }

    public string Login { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Surname { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PictureUrl { get; set; } = null!;

    public int? Role { get; set; }

    public bool IsAdmin { get; set; }

    public string? Telegramlogin { get; set; }

    public string? Biography { get; set; }

    public string? Country { get; set; }

    public int TimeZone { get; set; }
    public DateTime? DeletedDate { get; set; } = null;
    public virtual ICollection<Project>? UserProjects { get; set; }

    //данные, необходимые только для аутентификаци
    public class UserLoginData
    {
        public required string Login { get; set; }
        public required string Password { get; set; }
    }

    //настройки токена
    public class AuthOptions
    {
        public const string ISSUER = "MyAuthServer"; // издатель токена
        public const string AUDIENCE = "MyAuthClient"; // потребитель токена
        const string KEY = "mysupersecret_secretsecretsecretkey!123";   // ключ для шифрации
        public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
    }

}
