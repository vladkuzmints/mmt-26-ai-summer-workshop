namespace Mmt.Ai.Challenge.Services;

public record ClaudeRequest(string Message, string? SystemPrompt = null);