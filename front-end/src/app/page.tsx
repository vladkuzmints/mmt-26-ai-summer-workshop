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
      {step === 0 && (
        <Chat/>
      )}

      {step === 1 && (
        <Quiz/>
      )}

      {step === 2 && (
        <Swiper/>
      )}

       {step === 4 && (
        <Chat/>
      )}
    </>
  );
};

export default HolidayProfileQuiz;
