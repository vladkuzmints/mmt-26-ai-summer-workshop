namespace Mmt.Ai.Challenge.Services;

public interface IClaudeService
{
    Task<ClaudeResponse> GetResponseAsync(ClaudeRequest request);
    Task<ClaudeResponse> GetTripRecommendationAsync(string preferences);
}