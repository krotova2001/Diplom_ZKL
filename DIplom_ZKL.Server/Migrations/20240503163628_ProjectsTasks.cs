using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DIplom_ZKL.Server.Migrations
{
    /// <inheritdoc />
    public partial class ProjectsTasks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_taskitem_project_projectId",
                table: "taskitem");

            migrationBuilder.DropForeignKey(
                name: "ProjectIdx",
                table: "taskitem");

            migrationBuilder.DropIndex(
                name: "IX_taskitem_ProjectId",
                table: "taskitem");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "taskitem");

            migrationBuilder.RenameColumn(
                name: "projectId",
                table: "taskitem",
                newName: "ProjectId");

            migrationBuilder.RenameIndex(
                name: "IX_taskitem_projectId",
                table: "taskitem",
                newName: "IX_taskitem_ProjectId");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProjectId",
                table: "taskitem",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "project",
                table: "taskitem",
                column: "ProjectId",
                principalTable: "project",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "project",
                table: "taskitem");

            migrationBuilder.RenameColumn(
                name: "ProjectId",
                table: "taskitem",
                newName: "projectId");

            migrationBuilder.RenameIndex(
                name: "IX_taskitem_ProjectId",
                table: "taskitem",
                newName: "IX_taskitem_projectId");

            migrationBuilder.AlterColumn<Guid>(
                name: "projectId",
                table: "taskitem",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

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
                name: "FK_taskitem_project_projectId",
                table: "taskitem",
                column: "projectId",
                principalTable: "project",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "ProjectIdx",
                table: "taskitem",
                column: "ProjectId",
                principalTable: "project",
                principalColumn: "id");
        }
    }
}
