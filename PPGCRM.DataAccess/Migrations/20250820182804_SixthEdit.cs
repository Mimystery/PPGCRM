using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PPGCRM.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class SixthEdit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Stages",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Stages");
        }
    }
}
