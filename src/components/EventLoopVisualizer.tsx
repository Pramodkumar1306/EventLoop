import React, { useState, useEffect, useRef } from 'react';
import CodeExample from './CodeExample';
import CallStack from './CallStack';
import WebAPIs from './WebAPIs';
import CallbackQueue from './CallbackQueue';
import EventLoop from './EventLoop';
import Controls from './Controls';
import { Task } from '../types/Task';
import { examples } from '../data/examples';

const EventLoopVisualizer: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState(0);
  const [callStack, setCallStack] = useState<Task[]>([]);
  const [webAPIs, setWebAPIs] = useState<Task[]>([]);
  const [callbackQueue, setCallbackQueue] = useState<Task[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1000); // milliseconds
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const example = examples[selectedExample];
  const totalSteps = example.steps.length;

  useEffect(() => {
    // Reset the state when changing examples
    setCallStack([]);
    setWebAPIs([]);
    setCallbackQueue([]);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [selectedExample]);

  useEffect(() => {
    if (isPlaying && currentStep < totalSteps) {
      timerRef.current = setTimeout(() => {
        executeStep();
      }, speed);
    } else if (currentStep >= totalSteps) {
      setIsPlaying(false);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStep, totalSteps, speed]);

  const executeStep = () => {
    if (currentStep >= totalSteps) {
      setIsPlaying(false);
      return;
    }

    const step = example.steps[currentStep];
    
    // Update the state based on the current step
    if (step.callStack !== undefined) setCallStack(step.callStack);
    if (step.webAPIs !== undefined) setWebAPIs(step.webAPIs);
    if (step.callbackQueue !== undefined) setCallbackQueue(step.callbackQueue);
    
    setCurrentStep(prev => prev + 1);
  };

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const reset = () => {
    setCallStack([]);
    setWebAPIs([]);
    setCallbackQueue([]);
    setCurrentStep(0);
    setIsPlaying(false);
  };
  const nextStep = () => {
    if (currentStep < totalSteps) {
      executeStep();
    }
  };

  const changeSpeed = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-blue-50 border-b">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">JavaScript Event Loop Visualization</h2>
        <p className="text-gray-600">
          See how JavaScript handles synchronous and asynchronous operations through the Event Loop.
        </p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <CodeExample 
              examples={examples} 
              selectedExample={selectedExample}
              onSelectExample={setSelectedExample}
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
            <div className="mt-4">
              <Controls 
                isPlaying={isPlaying}
                onPlay={play}
                onPause={pause}
                onReset={reset}
                onNextStep={nextStep}
                currentStep={currentStep}
                totalSteps={totalSteps}
                speed={speed}
                onSpeedChange={changeSpeed}
              />
            </div>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 gap-4">
            <CallStack tasks={callStack} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <WebAPIs tasks={webAPIs} />
              <CallbackQueue tasks={callbackQueue} />
            </div>
            
            <EventLoop active={currentStep > 0 && callStack.length === 0 && callbackQueue.length > 0} />
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 border-t">
        <h3 className="font-medium text-gray-700 mb-2">How it works:</h3>
        <ul className="list-disc pl-5 text-gray-600 space-y-1">
          <li><strong>Call Stack:</strong> JavaScript's single thread where all code executes (the chef)</li>
          <li><strong>Web APIs:</strong> Browser features that handle asynchronous operations (the assistants)</li>
          <li><strong>Callback Queue:</strong> Where callbacks wait to be processed (the waiting line)</li>
          <li><strong>Event Loop:</strong> Checks if the Call Stack is empty, then moves callbacks from the Queue to the Stack (the manager)</li>
        </ul>
      </div>
    </div>
  );
};

export default EventLoopVisualizer;