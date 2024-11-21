import React, { useRef, useEffect } from 'react';
import { Trophy } from 'lucide-react';

interface PrizeWheelProps {
  names: string[];
  isSpinning: boolean;
  winner: string;
  rotation: number;
  onSpin: () => void;
}

export default function PrizeWheel({ names, isSpinning, winner, rotation, onSpin }: PrizeWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas || names.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    const sliceAngle = (2 * Math.PI) / names.length;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);

    names.forEach((name, index) => {
      const angle = index * sliceAngle;
      
      ctx.fillStyle = index % 2 === 0 ? '#4B5563' : '#374151';
      
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, angle, angle + sliceAngle);
      ctx.closePath();
      ctx.fill();

      ctx.save();
      ctx.rotate(angle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px Inter, sans-serif';
      ctx.fillText(name, radius - 20, 5);
      ctx.restore();
    });

    ctx.restore();

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#1F2937';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  useEffect(() => {
    drawWheel();
  }, [names, rotation]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border-4 border-gray-700 rounded-full"
        />
        <div className="absolute top-0 left-1/2 -ml-3 w-6 h-6">
          <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-yellow-500"></div>
        </div>
      </div>

      <button
        onClick={onSpin}
        disabled={isSpinning || names.length === 0}
        className={`mt-6 py-3 px-8 rounded-lg flex items-center space-x-2 ${
          isSpinning || names.length === 0
            ? 'bg-gray-700 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        <Trophy className="w-5 h-5" />
        <span>{isSpinning ? 'Spinning...' : 'Spin the Wheel!'}</span>
      </button>

      {winner && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-bold text-green-400">Winner!</h3>
          <p className="text-2xl font-bold mt-2">{winner}</p>
        </div>
      )}
    </div>
  );
}