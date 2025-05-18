import React from 'react';
import { Task } from '../types/Task';
import { motion, AnimatePresence } from 'framer-motion';

interface CallStackProps {
  tasks: Task[];
}

const CallStack: React.FC<CallStackProps> = ({ tasks }) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="bg-blue-600 text-white p-3">
        <h3 className="font-semibold">Call Stack (LIFO)</h3>
        <p className="text-sm opacity-80">The main execution thread</p>
      </div>
      
      <div className="p-4 bg-blue-50 h-60 flex flex-col-reverse">
        <AnimatePresence>
          {tasks.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400 italic">Stack is empty</p>
            </div>
          )}
          
          {tasks.map((task, index) => (
            <motion.div
              key={`${task.id}-${index}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className={`p-3 mb-2 rounded border-l-4 ${
                task.type === 'sync' ? 'bg-blue-100 border-blue-500' : 
                task.type === 'async' ? 'bg-orange-100 border-orange-500' : 
                'bg-green-100 border-green-500'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm">{task.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  task.type === 'sync' ? 'bg-blue-200 text-blue-800' : 
                  task.type === 'async' ? 'bg-orange-200 text-orange-800' : 
                  'bg-green-200 text-green-800'
                }`}>
                  {task.type}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CallStack;