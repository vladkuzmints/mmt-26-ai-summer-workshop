"use client";

import { useState } from "react";
import Chat from './components/Chat';
import Swiper from './components/Swiper';
import Quiz from './components/Quiz';

const HolidayProfileQuiz = () => {
  const [step, setStep] = useState(0);

  const [profile, setProfile] = useState({
    budget: "",
    activity: "",
    climate: "",
    interests: [] as string[],
    duration: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInterestToggle = (interest: string) => {
    setProfile((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    console.log("User profile:", profile);
  };

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const reset = () => {
    setProfile({
      budget: "",
      activity: "",
      climate: "",
      interests: [],
      duration: "",
    });
    setIsSubmitted(false);
    setStep(0);
  };

  // Generate system prompt based on current step and profile
  const getSystemPrompt = () => {
    const basePrompt = "You are a helpful travel planning assistant.";
    
    if (step === 0) {
      return `${basePrompt} You're helping someone plan their holiday. Start by asking them about their travel preferences, budget, and what kind of experience they're looking for.`;
    }
    
    if (step === 4) {
      const profileSummary = `The user has completed their profile: Budget: ${profile.budget}, Activity Level: ${profile.activity}, Climate: ${profile.climate}, Duration: ${profile.duration}, Interests: ${profile.interests.join(', ')}`;
      return `${basePrompt} ${profileSummary}. Now provide personalized holiday recommendations based on their profile. Be specific about destinations, activities, and tips that match their preferences.`;
    }
    
    return basePrompt;
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-800">
            Profile Complete!
          </h2>
          <p className="text-gray-600 mt-2">Here's what you selected:</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="font-medium">Budget:</span>
            <span className="capitalize">{profile.budget}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="font-medium">Activity Level:</span>
            <span className="capitalize">{profile.activity}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="font-medium">Climate:</span>
            <span className="capitalize">{profile.climate}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="font-medium">Duration:</span>
            <span className="capitalize">
              {profile.duration.replace("-", " ")}
            </span>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <span className="font-medium">Interests:</span>
            <div className="flex flex-wrap gap-1 mt-2">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm capitalize"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setStep(4)}
            className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Get AI Recommendations
          </button>
          <button
            onClick={reset}
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Progress indicator */}
      <div className="mb-6 px-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Step {step + 1} of 5</span>
          <span className="text-sm text-gray-600">
            {step === 0 && "Initial Chat"}
            {step === 1 && "Quiz"}
            {step === 2 && "Swiper"}
            {step === 3 && "Review"}
            {step === 4 && "AI Recommendations"}
          </span>
        </div>
        <div className="mt-2 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step content */}
      {step === 0 && (
        <div>
          <Chat 
            systemPrompt={getSystemPrompt()}
            title="Welcome! Let's Plan Your Holiday"
          />
          <div className="mt-4 text-center">
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Continue to Quiz
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <Quiz />
          <div className="mt-4 flex justify-between">
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <Swiper />
          <div className="mt-4 flex justify-between">
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Review Your Profile</h2>
          <div className="space-y-3 mb-6">
            <p><strong>Budget:</strong> {profile.budget || "Not set"}</p>
            <p><strong>Activity Level:</strong> {profile.activity || "Not set"}</p>
            <p><strong>Climate:</strong> {profile.climate || "Not set"}</p>
            <p><strong>Duration:</strong> {profile.duration || "Not set"}</p>
            <p><strong>Interests:</strong> {profile.interests.join(", ") || "None selected"}</p>
          </div>
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Complete Profile
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <Chat 
            systemPrompt={getSystemPrompt()}
            title="Your Personalized Holiday Recommendations"
          />
          <div className="mt-4 text-center">
            <button
              onClick={reset}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HolidayProfileQuiz;