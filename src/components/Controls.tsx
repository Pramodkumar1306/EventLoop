import React from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  RotateCcw,
  Zap
} from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onNextStep: () => void;
  currentStep: number;
  totalSteps: number;
  speed: number;
  onSpeedChange: (speed: number) => void;
}

const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  onPlay,
  onPause,
  onReset,
  onNextStep,
  currentStep,
  totalSteps,
  speed,
  onSpeedChange
}) => {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-700">Execution Controls</h3>
        <div className="text-xs text-gray-500">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
      
      <div className="flex space-x-2 mb-4">
        {!isPlaying ? (
          <button 
            onClick={onPlay}
            disabled={currentStep >= totalSteps}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md py-2 px-4 flex items-center justify-center space-x-1 transition-colors"
          >
            <Play size={16} />
            <span>Play</span>
          </button>
        ) : (
          <button 
            onClick={onPause}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white rounded-md py-2 px-4 flex items-center justify-center space-x-1 transition-colors"
          >
            <Pause size={16} />
            <span>Pause</span>
          </button>
        )}
        
        <button 
          onClick={onNextStep}
          disabled={currentStep >= totalSteps}
          className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 rounded-md py-2 px-3 flex items-center justify-center transition-colors"
        >
          <SkipForward size={16} />
        </button>
        
        <button 
          onClick={onReset}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md py-2 px-3 flex items-center justify-center transition-colors"
        >
          <RotateCcw size={16} />
        </button>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm text-gray-600 flex items-center">
            <Zap size={14} className="mr-1" />
            Execution Speed:
          </label>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {speed}ms
          </span>
        </div>
        <input
          type="range"
          min="200"
          max="2000"
          step="200"
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Fast</span>
          <span>Slow</span>
        </div>
      </div>
    </div>
  );
};

export default Controls;