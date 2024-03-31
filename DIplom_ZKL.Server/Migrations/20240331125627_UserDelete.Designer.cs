﻿// <auto-generated />
using System;
using DIplom_ZKL.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DIplom_ZKL.Server.Migrations
{
    [DbContext(typeof(DiplomContext))]
    [Migration("20240331125627_UserDelete")]
    partial class UserDelete
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("DIplom_ZKL.Server.Models.Statement", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("character varying")
                        .HasColumnName("title");

                    b.HasKey("Id")
                        .HasName("statement_pkey");

                    b.ToTable("statement", (string)null);
                });

            modelBuilder.Entity("DIplom_ZKL.Server.Models.Taskitem", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<Guid>("Author")
                        .HasColumnType("uuid")
                        .HasColumnName("author");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("created_at");

                    b.Property<string>("Description")
                        .HasColumnType("character varying")
                        .HasColumnName("description");

                    b.Property<DateTime?>("End")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("end");

                    b.Property<DateTime?>("Start")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("start");

                    b.Property<int>("Statement")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasDefaultValue(0)
                        .HasColumnName("statement");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("character varying")
                        .HasColumnName("title");

                    b.HasKey("Id");

                    b.HasIndex("Author");

                    b.HasIndex("Statement");

                    b.ToTable("taskitem", null, t =>
                        {
                            t.HasComment("Задача");
                        });
                });

            modelBuilder.Entity("DIplom_ZKL.Server.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("Biography")
                        .HasColumnType("text");

                    b.Property<string>("Country")
                        .HasColumnType("text");

                    b.Property<DateTime?>("DeletedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsAdmin")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("boolean")
                        .HasDefaultValue(false)
                        .HasColumnName("is_admin");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasColumnType("character varying")
                        .HasColumnName("login");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("character varying")
                        .HasColumnName("name");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("character varying")
                        .HasColumnName("password");

                    b.Property<byte[]>("Picture")
                        .HasColumnType("bytea")
                        .HasColumnName("picture");

                    b.Property<string>("PictureUrl")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("Role")
                        .HasColumnType("integer")
                        .HasColumnName("role");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("character varying")
                        .HasColumnName("surname");

                    b.Property<string>("Telegramlogin")
                        .HasColumnType("character varying")
                        .HasColumnName("telegramlogin");

                    b.Property<int>("TimeZone")
                        .HasColumnType("integer");

                    b.HasKey("Id")
                        .HasName("users_pkey");

                    b.ToTable("users", null, t =>
                        {
                            t.HasComment("Пользователи системы");
                        });
                });

            modelBuilder.Entity("DIplom_ZKL.Server.Models.Taskitem", b =>
                {
                    b.HasOne("DIplom_ZKL.Server.Models.User", "AuthorNavigation")
                        .WithMany()
                        .HasForeignKey("Author")
                        .IsRequired()
                        .HasConstraintName("user");

                    b.HasOne("DIplom_ZKL.Server.Models.Statement", "StatementNavigation")
                        .WithMany()
                        .HasForeignKey("Statement")
                        .IsRequired()
                        .HasConstraintName("statament");

                    b.Navigation("AuthorNavigation");

                    b.Navigation("StatementNavigation");
                });
#pragma warning restore 612, 618
        }
    }
}
