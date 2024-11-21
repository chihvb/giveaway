import React, { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';

interface PrizeSliderProps {
  names: string[];
  isSpinning: boolean;
  winner: string;
  onStart: () => void;
}

export default function PrizeSlider({ names, isSpinning, winner, onStart }: PrizeSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isSpinning && names.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % names.length);
      }, 100); // Speed of name changes

      return () => clearInterval(interval);
    } else {
      setCurrentIndex(0);
    }
  }, [isSpinning, names.length]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md aspect-square relative bg-gray-800 rounded-lg border-4 border-gray-700 overflow-hidden">
        {/* Highlight border */}
        <div className="absolute inset-0 border-8 border-yellow-500/50 pointer-events-none"></div>
        
        {/* Current name display */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="text-center">
            <p className="text-3xl font-bold break-words text-white">
              {isSpinning ? names[currentIndex] : (winner || 'Ready!')}
            </p>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-yellow-500"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-yellow-500"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-yellow-500"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-yellow-500"></div>
      </div>

      <button
        onClick={onStart}
        disabled={isSpinning || names.length === 0}
        className={`mt-6 py-3 px-8 rounded-lg flex items-center space-x-2 ${
          isSpinning || names.length === 0
            ? 'bg-gray-700 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        <Trophy className="w-5 h-5" />
        <span>{isSpinning ? 'Selecting...' : 'Start Selection!'}</span>
      </button>

      {winner && (
        <div className="mt-6 text-center animate-fade-in">
          <h3 className="text-xl font-bold text-green-400">Winner!</h3>
          <p className="text-2xl font-bold mt-2">{winner}</p>
        </div>
      )}
    </div>
  );
}