﻿using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Text;

namespace DIplom_ZKL.Server;

/// <summary>
/// Пользователи системы
/// </summary>
public partial class User
{
    public Guid Id { get; set; }

    public required string Login { get; set; } = null!;

    public string Password { get; set; } = null!;

    public required string Name { get; set; } = null!;

    public required string Surname { get; set; } = null!;

    public required string Email { get; set; }

    public byte[]? Picture { get; set; }

    public int? Role { get; set; }

    public bool IsAdmin { get; set; } = false!;

    public string? Telegramlogin { get; set; }

    public string? Biography { get; set; } //раздел О себе

    public string? Country { get; set; }

    public int TimeZone { get; set; } 


}



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
