"use client";

import React, { useState, useRef } from "react";
import { Heart, X, RotateCcw } from "lucide-react";

const SwipeCards = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Bali, Indonesia",
      description: "Beautiful beaches and temples",
      image: "🏝️",
    },
    {
      id: 2,
      title: "Tokyo, Japan",
      description: "Vibrant city culture",
      image: "🗼",
    },
    {
      id: 3,
      title: "Paris, France",
      description: "Romance and art",
      image: "🗼",
    },
    {
      id: 4,
      title: "New York, USA",
      description: "The city that never sleeps",
      image: "🏙️",
    },
    {
      id: 5,
      title: "Iceland",
      description: "Northern lights and glaciers",
      image: "🌌",
    },
    {
      id: 6,
      title: "Thailand",
      description: "Temples and street food",
      image: "🛕",
    },
    { id: 7, title: "Morocco", description: "Deserts and spices", image: "🕌" },
    {
      id: 8,
      title: "Australia",
      description: "Wildlife and beaches",
      image: "🦘",
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null as string | null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [liked, setLiked] = useState([] as any[]);
  const [passed, setPassed] = useState([] as any[]);
  const [dragStart, setDragStart] = useState(null as number | null);
  const [dragOffset, setDragOffset] = useState(0);
  const cardRef = useRef(null as HTMLDivElement | null);

  const handleSwipe = (direction: string) => {
    if (isAnimating || currentIndex >= cards.length) return;

    const currentCard = cards[currentIndex];
    setSwipeDirection(direction);
    setIsAnimating(true);

    if (direction === "right") {
      setLiked((prev) => [...prev, currentCard]);
    } else {
      setPassed((prev) => [...prev, currentCard]);
    }

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setSwipeDirection(null);
      setIsAnimating(false);
      setDragOffset(0);
    }, 300);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStart === null) return;
    const diff = e.clientX - dragStart;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (dragStart === null) return;

    if (Math.abs(dragOffset) > 100) {
      handleSwipe(dragOffset > 0 ? "right" : "left");
    } else {
      setDragOffset(0);
    }
    setDragStart(null);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStart === null) return;
    const diff = e.touches[0].clientX - dragStart;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (dragStart === null) return;

    if (Math.abs(dragOffset) > 100) {
      handleSwipe(dragOffset > 0 ? "right" : "left");
    } else {
      setDragOffset(0);
    }
    setDragStart(null);
  };

  const reset = () => {
    setCurrentIndex(0);
    setLiked([]);
    setPassed([]);
    setDragOffset(0);
    setDragStart(null);
    setSwipeDirection(null);
    setIsAnimating(false);
  };

  const getCardTransform = () => {
    if (swipeDirection === "right") return "translateX(100%) rotate(20deg)";
    if (swipeDirection === "left") return "translateX(-100%) rotate(-20deg)";
    return `translateX(${dragOffset}px) rotate(${dragOffset * 0.1}deg)`;
  };

  const getCardOpacity = () => {
    if (swipeDirection) return 0;
    return Math.max(0.7, 1 - Math.abs(dragOffset) / 300);
  };

  if (currentIndex >= cards.length) {
    return (
      <div className="max-w-sm mx-auto p-6 bg-white rounded-xl shadow-lg text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-4">All done!</h2>
        <div className="mb-6">
          <p className="text-green-600 mb-2">❤️ Liked: {liked.length}</p>
          <p className="text-red-600 mb-4">👎 Passed: {passed.length}</p>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-2 mx-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <RotateCcw size={20} />
          Start Over
        </button>
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const nextCard = cards[currentIndex + 1];

  return (
    <div className="max-w-sm mx-auto p-6">
      <div className="relative mb-6">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Travel Destinations
          </h1>
          <p className="text-gray-600">
            {currentIndex + 1} of {cards.length}
          </p>
        </div>

        <div className="relative h-96 perspective-1000">
          {/* Next card (background) */}
          {nextCard && (
            <div className="absolute inset-0 bg-white rounded-xl shadow-md border-2 border-gray-200 p-6 scale-95 z-10">
              <div className="text-center">
                <div className="text-6xl mb-4">{nextCard.image}</div>
                <h3 className="text-xl font-bold text-gray-400">
                  {nextCard.title}
                </h3>
                <p className="text-gray-400 mt-2">{nextCard.description}</p>
              </div>
            </div>
          )}

          {/* Current card */}
          <div
            ref={cardRef}
            className="absolute inset-0 bg-white rounded-xl shadow-xl border-2 border-gray-300 p-6 cursor-grab active:cursor-grabbing z-20"
            style={{
              transform: getCardTransform(),
              opacity: getCardOpacity(),
              transition: isAnimating ? "all 0.3s ease-out" : "none",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="text-center h-full flex flex-col justify-center">
              <div className="text-6xl mb-4">{currentCard.image}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {currentCard.title}
              </h3>
              <p className="text-gray-600 text-lg">{currentCard.description}</p>
            </div>

            {/* Swipe indicators */}
            {dragOffset > 50 && (
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full font-bold transform rotate-12">
                LIKE
              </div>
            )}
            {dragOffset < -50 && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold transform -rotate-12">
                NOPE
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleSwipe("left")}
          className="w-14 h-14 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
          disabled={isAnimating}
        >
          <X size={24} />
        </button>
        <button
          onClick={() => handleSwipe("right")}
          className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors shadow-lg"
          disabled={isAnimating}
        >
          <Heart size={24} />
        </button>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        Swipe or drag cards left/right, or use buttons
      </div>
    </div>
  );
};

export default SwipeCards;
