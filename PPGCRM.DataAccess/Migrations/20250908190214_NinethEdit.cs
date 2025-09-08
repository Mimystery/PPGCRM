using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PPGCRM.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class NinethEdit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProcessFiles",
                columns: table => new
                {
                    ProcessFileId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProcessId = table.Column<Guid>(type: "uuid", nullable: false),
                    FileName = table.Column<string>(type: "text", nullable: false),
                    FilePath = table.Column<string>(type: "text", nullable: false),
                    MimeType = table.Column<string>(type: "text", nullable: false),
                    FileSize = table.Column<long>(type: "bigint", nullable: false),
                    UploadedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UploadedBy = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcessFiles", x => x.ProcessFileId);
                    table.ForeignKey(
                        name: "FK_ProcessFiles_Processes_ProcessId",
                        column: x => x.ProcessId,
                        principalTable: "Processes",
                        principalColumn: "ProcessId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProcessPauses",
                columns: table => new
                {
                    PauseId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProcessId = table.Column<Guid>(type: "uuid", nullable: false),
                    StartPauseDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    EndPauseDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcessPauses", x => x.PauseId);
                    table.ForeignKey(
                        name: "FK_ProcessPauses_Processes_ProcessId",
                        column: x => x.ProcessId,
                        principalTable: "Processes",
                        principalColumn: "ProcessId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProcessFiles_ProcessId",
                table: "ProcessFiles",
                column: "ProcessId");

            migrationBuilder.CreateIndex(
                name: "IX_ProcessPauses_ProcessId",
                table: "ProcessPauses",
                column: "ProcessId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProcessFiles");

            migrationBuilder.DropTable(
                name: "ProcessPauses");
        }
    }
}
