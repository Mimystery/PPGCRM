using Microsoft.EntityFrameworkCore;
using PPGCRM.DataAccess;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<CRMDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString(nameof(CRMDbContext)));
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();




var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<CRMDbContext>();
    db.Database.Migrate(); // Apply any pending migrations to the database
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
