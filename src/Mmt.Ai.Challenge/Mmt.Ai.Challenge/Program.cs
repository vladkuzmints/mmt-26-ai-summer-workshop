// Program.cs setup

using Mmt.Ai.Challenge.Services;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services
        builder.Services.AddHttpClient<IClaudeService, ClaudeService>();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        // Configure pipeline
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        // Minimal API endpoints
        app.MapPost("/api/claude/chat", async (ClaudeRequest request, IClaudeService claudeService) =>
            {
                var response = await claudeService.GetResponseAsync(request);
                return response.Success ? Results.Ok(response) : Results.BadRequest(response);
            })
            .WithName("ChatWithClaude")
            .WithOpenApi();

        app.MapPost("/api/travel/recommend", async (string preferences, IClaudeService claudeService) =>
            {
                var response = await claudeService.GetTripRecommendationAsync(preferences);
                return response.Success ? Results.Ok(response) : Results.BadRequest(response);
            })
            .WithName("GetTravelRecommendations")
            .WithOpenApi();

        app.MapGet("/api/health", () => Results.Ok(new { Status = "Healthy", Timestamp = DateTime.UtcNow }))
            .WithName("HealthCheck")
            .WithOpenApi();

        app.Run();
    }
}