using System;
using System.Collections.Generic;

namespace DIplom_ZKL.Server;

/// <summary>
/// Пользователи системы
/// </summary>
public partial class User
{
    public Guid Id { get; set; }

    public string Login { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Surname { get; set; } = null!;

    public byte[]? Picture { get; set; }

    public int? Role { get; set; }

    public bool IsAdmin { get; set; } = false!;

    public string? Telegramlogin { get; set; }
}
