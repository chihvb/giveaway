import React, { useState } from 'react';
import NameInput from './components/NameInput';
import PrizeSlider from './components/PrizeSlider';

function App() {
  const [names, setNames] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState('');

  const PREDETERMINED_WINNER = "chahine.joujou";

  const handleAddNames = (newNames: string[]) => {
    const uniqueNames = Array.from(new Set(newNames));
    if (!uniqueNames.includes(PREDETERMINED_WINNER)) {
      uniqueNames.push(PREDETERMINED_WINNER);
    }
    setNames(uniqueNames);
  };

  const startAnimation = () => {
    if (isSpinning || names.length === 0) return;

    setIsSpinning(true);
    setWinner('');

    // Simulate random selection animation
    const duration = 60000; // 8 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setWinner(PREDETERMINED_WINNER);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <img src="https://i.ibb.co/PN1cMXv/HOLLYWss-OOD-SMILE.png" alt="Logo" className="h-20 object-contain" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <NameInput onAddNames={handleAddNames} />
          <PrizeSlider
            names={names}
            isSpinning={isSpinning}
            winner={winner}
            onStart={startAnimation}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
