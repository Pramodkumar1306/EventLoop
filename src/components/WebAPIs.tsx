import React from 'react';
import { Task } from '../types/Task';
import { motion, AnimatePresence } from 'framer-motion';

interface WebAPIsProps {
  tasks: Task[];
}

const WebAPIs: React.FC<WebAPIsProps> = ({ tasks }) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="bg-orange-500 text-white p-3">
        <h3 className="font-semibold">Web APIs</h3>
        <p className="text-sm opacity-80">Browser's asynchronous helpers</p>
      </div>
      
      <div className="p-4 bg-orange-50 h-40">
        <AnimatePresence>
          {tasks.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400 italic">No active tasks</p>
            </div>
          )}
          
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="p-3 mb-2 rounded bg-orange-100 border-l-4 border-orange-500"
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm">{task.name}</span>
                {task.duration && (
                  <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full">
                    {task.duration}ms
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WebAPIs;