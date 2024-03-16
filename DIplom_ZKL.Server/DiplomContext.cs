using System;
using System.Collections.Generic;
using DIplom_ZKL.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace DIplom_ZKL.Server;

public partial class DiplomContext : DbContext
{
    public DiplomContext()
    {
        
    }

    public DiplomContext(DbContextOptions<DiplomContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Statement> Statements { get; set; }

    public virtual DbSet<Taskitem> Taskitems { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
    {
        ConfigurationBuilder builder = new ConfigurationBuilder();
        builder.SetBasePath(Directory.GetCurrentDirectory());
        builder.AddJsonFile("appsettings.json");
        optionsBuilder.UseNpgsql(builder.Build().GetConnectionString("constring"));
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Statement>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("statement_pkey");

            entity.ToTable("statement");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Title)
                .HasColumnType("character varying")
                .HasColumnName("title");
        });

        modelBuilder.Entity<Taskitem>(entity =>
        {
            entity
                .ToTable("taskitem", tb => tb.HasComment("Задача"));

            entity.Property(e => e.Author).HasColumnName("author");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.Description)
                .HasColumnType("character varying")
                .HasColumnName("description");
            entity.Property(e => e.End)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("end");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Start)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("start");
            entity.Property(e => e.Statement)
                .HasDefaultValue(0)
                .HasColumnName("statement");
            entity.Property(e => e.Title)
                .HasColumnType("character varying")
                .HasColumnName("title");

            entity.HasOne(d => d.AuthorNavigation).WithMany()
                .HasForeignKey(d => d.Author)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("user");

            entity.HasOne(d => d.StatementNavigation).WithMany()
                .HasForeignKey(d => d.Statement)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("statament");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("users_pkey");

            entity.ToTable("users", tb => tb.HasComment("Пользователи системы"));

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.IsAdmin)
                .HasDefaultValue(false)
                .HasColumnName("is_admin");
            entity.Property(e => e.Login)
                .HasColumnType("character varying")
                .HasColumnName("login");
            entity.Property(e => e.Name)
                .HasColumnType("character varying")
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasColumnType("character varying")
                .HasColumnName("password");
            entity.Property(e => e.Picture).HasColumnName("picture");
            entity.Property(e => e.Role).HasColumnName("role");
            entity.Property(e => e.Surname)
                .HasColumnType("character varying")
                .HasColumnName("surname");
            entity.Property(e => e.Telegramlogin)
                .HasColumnType("character varying")
                .HasColumnName("telegramlogin");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
