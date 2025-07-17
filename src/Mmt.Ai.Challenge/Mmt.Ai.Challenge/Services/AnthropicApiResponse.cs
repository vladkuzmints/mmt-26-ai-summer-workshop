namespace Mmt.Ai.Challenge.Services;

public record AnthropicApiResponse(
    Content[] Content,
    string? Error = null
);