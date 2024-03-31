using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DIplom_ZKL.Server.Migrations
{
    /// <inheritdoc />
    public partial class UserDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedDate",
                table: "users",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PictureUrl",
                table: "users",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "statement",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    title = table.Column<string>(type: "character varying", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("statement_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "taskitem",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    title = table.Column<string>(type: "character varying", nullable: false),
                    description = table.Column<string>(type: "character varying", nullable: true),
                    start = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    end = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    author = table.Column<Guid>(type: "uuid", nullable: false),
                    statement = table.Column<int>(type: "integer", nullable: false, defaultValue: 0)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_taskitem", x => x.id);
                    table.ForeignKey(
                        name: "statament",
                        column: x => x.statement,
                        principalTable: "statement",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "user",
                        column: x => x.author,
                        principalTable: "users",
                        principalColumn: "id");
                },
                comment: "Задача");

            migrationBuilder.CreateIndex(
                name: "IX_taskitem_author",
                table: "taskitem",
                column: "author");

            migrationBuilder.CreateIndex(
                name: "IX_taskitem_statement",
                table: "taskitem",
                column: "statement");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "taskitem");

            migrationBuilder.DropTable(
                name: "statement");

            migrationBuilder.DropColumn(
                name: "DeletedDate",
                table: "users");

            migrationBuilder.DropColumn(
                name: "PictureUrl",
                table: "users");
        }
    }
}
