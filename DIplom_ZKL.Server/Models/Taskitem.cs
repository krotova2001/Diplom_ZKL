using System;
using System.Collections.Generic;

namespace DIplom_ZKL.Server.Models;

/// <summary>
/// Задача
/// </summary>
public partial class Taskitem
{

    public Guid Id { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime? Start { get; set; }

    public DateTime? End { get; set; }

    public DateTime CreatedAt { get; set; }

    public Guid Author { get; set; }

    public Guid ProjectId { get; set; }

    public int Statement { get; set; }

    public virtual User AuthorNavigation { get; set; } = null!;

    public virtual Statement StatementNavigation { get; set; } = null!;

    public virtual Project ProjectNavigation { get; set; } = null!;

}
