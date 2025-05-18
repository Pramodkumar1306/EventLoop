import React from 'react';
import EventLoopVisualizer from './components/EventLoopVisualizer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800">JavaScript Event Loop Visualizer</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-6">
        <EventLoopVisualizer />
      </main>
      <footer className="bg-white py-4 border-t">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          Inspired by Akanksha Ma'am's JavaScript Event Loop explanation
        </div>
      </footer>
    </div>
  );
}

export default App;