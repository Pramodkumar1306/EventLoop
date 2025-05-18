import React from 'react';
import { Clock as ArrowClockwise } from 'lucide-react';
import { motion } from 'framer-motion';

interface EventLoopProps {
  active: boolean;
}

const EventLoop: React.FC<EventLoopProps> = ({ active }) => {
  return (
    <div className="flex justify-center items-center py-2">
      <div className="bg-purple-100 rounded-lg p-3 flex items-center space-x-3">
        <motion.div
          animate={
            active 
              ? { 
                  rotate: [0, 360],
                  transition: { 
                    repeat: Infinity, 
                    duration: 1.5,
                    ease: "linear" 
                  }
                } 
              : { rotate: 0 }
          }
        >
          <ArrowClockwise 
            size={24} 
            className={active ? "text-purple-600" : "text-purple-400"} 
          />
        </motion.div>
        <div>
          <p className="font-medium text-purple-800">Event Loop</p>
          <p className="text-xs text-purple-600">
            {active 
              ? "Active: Moving callback from Queue to Stack" 
              : "Waiting: Call Stack is busy or Queue is empty"
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventLoop;