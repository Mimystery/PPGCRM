using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PPGCRM.Application.Mappings;
using PPGCRM.Application.Services;
using PPGCRM.Core.Abstractions.Clients;
using PPGCRM.Core.Abstractions.Projects;
using PPGCRM.DataAccess;
using PPGCRM.DataAccess.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<CRMDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString(nameof(CRMDbContext)));
});

builder.Services.AddAutoMapper(cfg =>
{
    cfg.AddMaps(AppDomain.CurrentDomain.GetAssemblies());
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IClientsRepository, ClientsRepository>();
builder.Services.AddScoped<IClientsService, ClientsService>();

builder.Services.AddScoped<IProjectsRepository, ProjectsRepository>();
builder.Services.AddScoped<IProjectsService, ProjectsService>();

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
