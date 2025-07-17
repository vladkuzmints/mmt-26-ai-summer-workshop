namespace Mmt.Ai.Challenge.Services
{
    public class ClaudeService : IClaudeService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly string _model;

        public ClaudeService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _apiKey = configuration["Anthropic:ApiKey"]
                ?? throw new InvalidOperationException("Anthropic API key not configured");
            _model = configuration["Anthropic:Model"] ?? "claude-3-sonnet-20240229";

            _httpClient.DefaultRequestHeaders.Add("x-api-key", _apiKey);
            _httpClient.DefaultRequestHeaders.Add("anthropic-version", "2023-06-01");
        }

        public async Task<ClaudeResponse> GetResponseAsync(ClaudeRequest request)
        {
            try
            {
                var apiRequest = new AnthropicApiRequest(
                    Model: _model,
                    Max_tokens: 1000,
                    Messages: new object[]
                    {
                    new Message("user", request.Message)
                    },
                    System: request.SystemPrompt
                );

                var response = await _httpClient.PostAsJsonAsync(
                    "https://api.anthropic.com/v1/messages",
                    apiRequest
                );

                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    return new ClaudeResponse("", false, $"API Error: {response.StatusCode} - {errorContent}");
                }

                var apiResponse = await response.Content.ReadFromJsonAsync<AnthropicApiResponse>();

                if (apiResponse?.Content?.Length > 0)
                {
                    return new ClaudeResponse(apiResponse.Content[0].Text, true);
                }

                return new ClaudeResponse("", false, "No response content received");
            }
            catch (Exception ex)
            {
                return new ClaudeResponse("", false, ex.Message);
            }
        }

        public async Task<ClaudeResponse> GetTripRecommendationAsync(string preferences)
        {
            var systemPrompt = @"You are a travel expert. Provide 3 holiday recommendations based on user preferences. 
                           Format as JSON with: destination, price_range, why_perfect, image_suggestion.
                           Keep responses concise and engaging.";

            var request = new ClaudeRequest($"Suggest holidays based on: {preferences}", systemPrompt);
            return await GetResponseAsync(request);
        }
    }
}
