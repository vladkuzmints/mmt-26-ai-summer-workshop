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
  
  return (
    <div className="mx-auto max-w-[450px]" style={{margin: "auto"}}>
      {/* Logo Header */}
      <div className="text-center mb-6">
        <img 
          src="/logo.png" 
          alt="Holiday Planner Logo" 
          className="mx-auto h-16 w-auto mb-2"
        />
      </div>

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
        <div className="bg-white rounded-xl shadow-lg p-8">
          <Chat 
            systemPrompt={getSystemPrompt()}
            title="Welcome! Let's Plan Your Holiday"
          />
          <div className="mt-8 text-center">
            <button
              onClick={nextStep}
              className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium"
            >
              Continue to Quiz
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <Quiz />
          <div className="mt-8 flex justify-between">
            <button
              onClick={prevStep}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <Swiper />
          <div className="mt-8 flex justify-between">
            <button
              onClick={prevStep}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Review Your Profile</h2>
          <div className="space-y-6 mb-8">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-lg"><strong className="text-gray-700">Budget:</strong> <span className="text-gray-900">{profile.budget || "Not set"}</span></p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-lg"><strong className="text-gray-700">Activity Level:</strong> <span className="text-gray-900">{profile.activity || "Not set"}</span></p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-lg"><strong className="text-gray-700">Climate:</strong> <span className="text-gray-900">{profile.climate || "Not set"}</span></p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-lg"><strong className="text-gray-700">Duration:</strong> <span className="text-gray-900">{profile.duration || "Not set"}</span></p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-lg"><strong className="text-gray-700">Interests:</strong> <span className="text-gray-900">{profile.interests.join(", ") || "None selected"}</span></p>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-lg"
            >
              Complete Profile
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <Chat 
            systemPrompt={getSystemPrompt()}
            title="Your Personalized Holiday Recommendations"
          />
          <div className="mt-8 text-center">
            <button
              onClick={reset}
              className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium"
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