"use client";

import { useState } from "react";
import { User, ArrowRight } from "lucide-react";
import Chat from './components/Chat';

const HolidayProfileQuiz = () => {
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

  const reset = () => {
    setProfile({
      budget: "",
      activity: "",
      climate: "",
      interests: [],
      duration: "",
    });
    setIsSubmitted(false);
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

        <button
          onClick={reset}
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Take Quiz Again
        </button>
      </div>
    );
  }

  return (

    <>
      <Chat/>
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-6">
          <User className="mx-auto mb-2 text-blue-500" size={48} />
          <h1 className="text-2xl font-bold text-gray-800">
            Your Holiday Profile
          </h1>
          <p className="text-gray-600">
            Tell us your preferences for personalized recommendations
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["low", "medium", "high"].map((budget) => (
                <button
                  key={budget}
                  onClick={() => setProfile((prev) => ({ ...prev, budget }))}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    profile.budget === budget
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {budget === "low" && "💰"}
                  {budget === "medium" && "💰💰"}
                  {budget === "high" && "💰💰💰"}
                  <div className="text-xs capitalize mt-1">{budget}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: "relaxing", label: "Relaxing", emoji: "🧘" },
                { key: "moderate", label: "Moderate", emoji: "🚶" },
                { key: "active", label: "Active", emoji: "🏃" },
              ].map((activity) => (
                <button
                  key={activity.key}
                  onClick={() =>
                    setProfile((prev) => ({ ...prev, activity: activity.key }))
                  }
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    profile.activity === activity.key
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {activity.emoji}
                  <div className="text-xs mt-1">{activity.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Climate
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: "tropical", label: "Tropical", emoji: "🌴" },
                { key: "temperate", label: "Temperate", emoji: "🌤️" },
                { key: "cool", label: "Cool", emoji: "❄️" },
                { key: "warm", label: "Warm", emoji: "☀️" },
              ].map((climate) => (
                <button
                  key={climate.key}
                  onClick={() =>
                    setProfile((prev) => ({ ...prev, climate: climate.key }))
                  }
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    profile.climate === climate.key
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {climate.emoji}
                  <div className="text-xs mt-1">{climate.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trip Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: "long-weekend", label: "Weekend", emoji: "📅" },
                { key: "week", label: "Week", emoji: "🗓️" },
                { key: "two-weeks", label: "2+ Weeks", emoji: "📆" },
              ].map((duration) => (
                <button
                  key={duration.key}
                  onClick={() =>
                    setProfile((prev) => ({ ...prev, duration: duration.key }))
                  }
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    profile.duration === duration.key
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {duration.emoji}
                  <div className="text-xs mt-1">{duration.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interests (select all that apply)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: "beaches", label: "Beaches", emoji: "🏖️" },
                { key: "culture", label: "Culture", emoji: "🏛️" },
                { key: "food", label: "Food", emoji: "🍽️" },
                { key: "nature", label: "Nature", emoji: "🌲" },
                { key: "adventure", label: "Adventure", emoji: "🧗" },
                { key: "wellness", label: "Wellness", emoji: "🧘" },
                { key: "art", label: "Art", emoji: "🎨" },
                { key: "photography", label: "Photography", emoji: "📸" },
              ].map((interest) => (
                <button
                  key={interest.key}
                  onClick={() => handleInterestToggle(interest.key)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    profile.interests.includes(interest.key)
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {interest.emoji}
                  <div className="text-xs mt-1">{interest.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={
            !profile.budget ||
            !profile.activity ||
            !profile.climate ||
            !profile.duration ||
            profile.interests.length === 0
          }
          className="w-full mt-6 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          Complete Profile
          <ArrowRight size={20} />
        </button>

        <div className="mt-2 text-center text-sm text-gray-500">
          {Object.values(profile).filter((v) => v && v.length > 0).length}/5
          sections completed
        </div>
      </div>
    </>
  );
};

export default HolidayProfileQuiz;
