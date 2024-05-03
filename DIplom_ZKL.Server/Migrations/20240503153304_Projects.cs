using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DIplom_ZKL.Server.Migrations
{
    /// <inheritdoc />
    public partial class Projects : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "picture",
                table: "users");

            migrationBuilder.AddColumn<Guid>(
                name: "projectId",
                table: "taskitem",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "project",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    title = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("project_pkey", x => x.id);
                },
                comment: "Проекты");

            migrationBuilder.CreateTable(
                name: "ProjectUser",
                columns: table => new
                {
                    UserNavigationId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserProjectsId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectUser", x => new { x.UserNavigationId, x.UserProjectsId });
                    table.ForeignKey(
                        name: "FK_ProjectUser_project_UserProjectsId",
                        column: x => x.UserProjectsId,
                        principalTable: "project",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectUser_users_UserNavigationId",
                        column: x => x.UserNavigationId,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_taskitem_projectId",
                table: "taskitem",
                column: "projectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectUser_UserProjectsId",
                table: "ProjectUser",
                column: "UserProjectsId");

            migrationBuilder.AddForeignKey(
                name: "FK_taskitem_project_projectId",
                table: "taskitem",
                column: "projectId",
                principalTable: "project",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_taskitem_project_projectId",
                table: "taskitem");

            migrationBuilder.DropTable(
                name: "ProjectUser");

            migrationBuilder.DropTable(
                name: "project");

            migrationBuilder.DropIndex(
                name: "IX_taskitem_projectId",
                table: "taskitem");

            migrationBuilder.DropColumn(
                name: "projectId",
                table: "taskitem");

            migrationBuilder.AddColumn<byte[]>(
                name: "picture",
                table: "users",
                type: "bytea",
                nullable: true);
        }
    }
}
