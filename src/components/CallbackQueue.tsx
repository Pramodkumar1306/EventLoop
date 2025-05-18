import React from 'react';
import { Task } from '../types/Task';
import { motion, AnimatePresence } from 'framer-motion';

interface CallbackQueueProps {
  tasks: Task[];
}

const CallbackQueue: React.FC<CallbackQueueProps> = ({ tasks }) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="bg-green-600 text-white p-3">
        <h3 className="font-semibold">Callback Queue (FIFO)</h3>
        <p className="text-sm opacity-80">Tasks waiting to be executed</p>
      </div>
      
      <div className="p-4 bg-green-50 h-40 flex items-start">
        <AnimatePresence>
          {tasks.length === 0 && (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-gray-400 italic">Queue is empty</p>
            </div>
          )}
          
          <div className="flex flex-row items-center space-x-2 overflow-x-auto w-full">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="p-3 rounded bg-green-100 border-l-4 border-green-500 flex-shrink-0"
                style={{ minWidth: '120px' }}
              >
                <div className="flex flex-col">
                  <span className="font-mono text-sm">{task.name}</span>
                  <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full mt-1 self-start">
                    callback
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CallbackQueue;