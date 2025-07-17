namespace Mmt.Ai.Challenge.Services;

public record AnthropicApiRequest(
    string Model,
    int Max_tokens,
    object[] Messages,
    string? System = null
);