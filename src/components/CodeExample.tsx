import React from 'react';
import { Code, ChevronDown } from 'lucide-react';
import { Example } from '../types/Example';

interface CodeExampleProps {
  examples: Example[];
  selectedExample: number;
  onSelectExample: (index: number) => void;
  currentStep: number;
  totalSteps: number;
}

const CodeExample: React.FC<CodeExampleProps> = ({ 
  examples, 
  selectedExample, 
  onSelectExample,
  currentStep,
  totalSteps
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const example = examples[selectedExample];
  
  return (
    <div className="border rounded-lg overflow-hidden bg-gray-800 shadow-md">
      <div className="bg-gray-900 text-white p-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Code size={18} />
          <h3 className="font-semibold">Code Example</h3>
        </div>
        
        <div className="relative">
          <button 
            className="flex items-center space-x-1 bg-gray-700 hover:bg-gray-600 rounded px-3 py-1 text-sm transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{example.title}</span>
            <ChevronDown size={16} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isOpen && (
            <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-gray-700 z-10">
              <div className="py-1">
                {examples.map((ex, index) => (
                  <button
                    key={index}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      index === selectedExample ? 'bg-blue-600 text-white' : 'text-gray-200 hover:bg-gray-600'
                    }`}
                    onClick={() => {
                      onSelectExample(index);
                      setIsOpen(false);
                    }}
                  >
                    {ex.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 bg-gray-800 text-gray-100">
        <pre className="font-mono text-sm overflow-x-auto">
          <code>
            {example.code.split('\n').map((line, idx) => {
              // Highlight the current line based on the current step
              const isActive = example.highlightLines && 
                               currentStep > 0 && 
                               currentStep <= totalSteps &&
                               example.highlightLines[currentStep - 1] === idx;
              
              return (
                <div 
                  key={idx} 
                  className={`${isActive ? 'bg-blue-900 -mx-4 px-4' : ''}`}
                >
                  {line || '\u00A0'} {/* Use non-breaking space for empty lines */}
                </div>
              );
            })}
          </code>
        </pre>
      </div>
      
      <div className="bg-gray-700 p-3 text-gray-300">
        <p className="text-sm">{example.description}</p>
        <div className="mt-2 text-xs bg-gray-800 p-2 rounded">
          <p>Step {currentStep} of {totalSteps}</p>
          {currentStep > 0 && currentStep <= totalSteps && (
            <p className="mt-1">{example.steps[currentStep - 1].explanation}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeExample;