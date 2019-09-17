using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TogglerApi.Migrations
{
    public partial class ToggleAndServiceKeyRestriction : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_States_Services_ServiceId",
                table: "States");

            migrationBuilder.DropForeignKey(
                name: "FK_States_Toggles_ToggleId",
                table: "States");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedAt",
                table: "Toggles",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<string>(
                name: "Key",
                table: "Toggles",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Toggles",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedAt",
                table: "States",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<long>(
                name: "ToggleId",
                table: "States",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "ServiceId",
                table: "States",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "States",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedAt",
                table: "Services",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<string>(
                name: "Key",
                table: "Services",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Services",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Toggles_Key",
                table: "Toggles",
                column: "Key");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Services_Key",
                table: "Services",
                column: "Key");

            migrationBuilder.AddForeignKey(
                name: "FK_States_Services_ServiceId",
                table: "States",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_States_Toggles_ToggleId",
                table: "States",
                column: "ToggleId",
                principalTable: "Toggles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_States_Services_ServiceId",
                table: "States");

            migrationBuilder.DropForeignKey(
                name: "FK_States_Toggles_ToggleId",
                table: "States");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Toggles_Key",
                table: "Toggles");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Services_Key",
                table: "Services");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedAt",
                table: "Toggles",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Key",
                table: "Toggles",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Toggles",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedAt",
                table: "States",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "ToggleId",
                table: "States",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<long>(
                name: "ServiceId",
                table: "States",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "States",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedAt",
                table: "Services",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Key",
                table: "Services",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Services",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_States_Services_ServiceId",
                table: "States",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_States_Toggles_ToggleId",
                table: "States",
                column: "ToggleId",
                principalTable: "Toggles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
