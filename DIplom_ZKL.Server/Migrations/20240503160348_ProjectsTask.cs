using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DIplom_ZKL.Server.Migrations
{
    /// <inheritdoc />
    public partial class ProjectsTask : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "taskitem",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_taskitem_ProjectId",
                table: "taskitem",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "ProjectIdx",
                table: "taskitem",
                column: "ProjectId",
                principalTable: "project",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "ProjectIdx",
                table: "taskitem");

            migrationBuilder.DropIndex(
                name: "IX_taskitem_ProjectId",
                table: "taskitem");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "taskitem");
        }
    }
}
