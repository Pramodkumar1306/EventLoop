import { Example } from '../types/Example';
import { v4 as uuidv4 } from 'uuid';

// Simple setTimeout example
const simpleTimeoutExample: Example = {
  title: 'setTimeout Example',
  code: `console.log("Start");

setTimeout(() => {
  console.log("Timeout callback");
}, 2000);

console.log("End");`,
  description: 'A basic example showing how setTimeout works with the event loop',
  highlightLines: [0, 2, 3, 6],
  steps: [
    {
      callStack: [{ id: uuidv4(), name: 'main()', type: 'sync' }],
      explanation: 'Main function is pushed to the call stack'
    },
    {
      callStack: [
        { id: uuidv4(), name: 'main()', type: 'sync' },
        { id: uuidv4(), name: 'console.log("Start")', type: 'sync' }
      ],
      explanation: 'console.log("Start") is pushed to the call stack'
    },
    {
      callStack: [{ id: uuidv4(), name: 'main()', type: 'sync' }],
      explanation: 'console.log("Start") is executed and removed from the stack. "Start" is printed to the console.'
    },
    {
      callStack: [
        { id: uuidv4(), name: 'main()', type: 'sync' },
        { id: uuidv4(), name: 'setTimeout(...)', type: 'async' }
      ],
      explanation: 'setTimeout is pushed to the call stack'
    },
    {
      callStack: [{ id: uuidv4(), name: 'main()', type: 'sync' }],
      webAPIs: [{ id: uuidv4(), name: 'setTimeout(2000ms)', type: 'async', duration: 2000 }],
      explanation: 'setTimeout is moved to Web APIs to start the timer. It will wait for 2000ms.'
    },
    {
      callStack: [
        { id: uuidv4(), name: 'main()', type: 'sync' },
        { id: uuidv4(), name: 'console.log("End")', type: 'sync' }
      ],
      webAPIs: [{ id: uuidv4(), name: 'setTimeout(2000ms)', type: 'async', duration: 2000 }],
      explanation: 'console.log("End") is pushed to the call stack'
    },
    {
      callStack: [{ id: uuidv4(), name: 'main()', type: 'sync' }],
      webAPIs: [{ id: uuidv4(), name: 'setTimeout(2000ms)', type: 'async', duration: 2000 }],
      explanation: 'console.log("End") is executed and removed from the stack. "End" is printed to the console.'
    },
    {
      callStack: [],
      webAPIs: [{ id: uuidv4(), name: 'setTimeout(2000ms)', type: 'async', duration: 2000 }],
      explanation: 'main() completes execution and is removed from the call stack. The stack is now empty.'
    },
    {
      callStack: [],
      webAPIs: [],
      callbackQueue: [{ id: uuidv4(), name: 'console.log("Timeout callback")', type: 'callback' }],
      explanation: 'After 2000ms, setTimeout completes and moves its callback to the Callback Queue'
    },
    {
      callStack: [{ id: uuidv4(), name: 'console.log("Timeout callback")', type: 'callback' }],
      callbackQueue: [],
      explanation: 'Event Loop detects that the Call Stack is empty and moves the callback from the Queue to the Stack'
    },
    {
      callStack: [],
      explanation: 'The callback executes, logs "Timeout callback" to the console, and is removed from the stack. Execution complete.'
    }
  ]
};

// Zero timeout example
const zeroTimeoutExample: Example = {
  title: 'setTimeout(0) Example',
  code: `console.log("First");

setTimeout(() => {
  console.log("Third");
}, 0);

console.log("Second");`,
  description: 'This shows why setTimeout(0) still runs after synchronous code',
  highlightLines: [0, 2, 3, 6],
  steps: [
    {
      callStack: [{ id: uuidv4(), name: 'main()', type: 'sync' }],
      explanation: 'Main function is pushed to the call stack'
    },
    {
      callStack: [
        { id: uuidv4(), name: 'main()', type: 'sync' },
        { id: uuidv4(), name: 'console.log("First")', type: 'sync' }
      ],
      explanation: 'console.log("First") is pushed to the call stack'
    },
    {
      callStack: [{ id: uuidv4(), name: 'main()', type: 'sync' }],
      explanation: 'console.log("First") is executed and removed from the stack. "First" is printed to the console.'
    },
    {
      callStack: [
        { id: uuidv4(), name: 'main()', type: 'sync' },
        { id: uuidv4(), name: 'setTimeout(..., 0)', type: 'async' }
      ],
      explanation: 'setTimeout with 0ms delay is pushed to the call stack'
    },
    {
      callStack: [{ id: uuidv4(), name: 'main()', type: 'sync' }],
      webAPIs: [{ id: uuidv4(), name: 'setTimeout(0ms)', type: 'async', duration: 0 }],
      explanation: 'setTimeout is moved to Web APIs. Even with 0ms delay, it still follows the asynchronous pattern.'
    },
    {
      callStack: [
        { id: uuidv4(), name: 'main()', type: 'sync' },
        { id: uuidv4(), name: 'console.log("Second")', type: 'sync' }
      ],
      webAPIs: [{ id: uuidv4(), name: 'setTimeout(0ms)', type: 'async', duration: 0 }],
      explanation: 'console.log("Second") is pushed to the call stack'
    },
    {
      callStack: [{ id: uuidv4(), name: 'main()', type: 'sync' }],
      webAPIs: [],
      callbackQueue: [{ id: uuidv4(), name: 'console.log("Third")', type: 'callback' }],
      explanation: 'console.log("Second") executes and is removed. Meanwhile, the 0ms timer completes immediately and its callback is moved to the Callback Queue.'
    },
    {
      callStack: [],
      callbackQueue: [{ id: uuidv4(), name: 'console.log("Third")', type: 'callback' }],
      explanation: 'main() completes execution and is removed from the call stack. The stack is now empty.'
    },
    {
      callStack: [{ id: uuidv4(), name: 'console.log("Third")', type: 'callback' }],
      callbackQueue: [],
      explanation: 'Event Loop sees that the Call Stack is empty and moves the callback to the Stack'
    },
    {
      callStack: [],
      explanation: 'The callback executes, logs "Third" to the console, and is removed from the stack. Execution complete.'
    }
  ]
};

// Promise example
const promiseExample: Example = {
  title: 'Promise Example',
  code: `console.log("Start");

Promise.resolve()
  .then(() => {
    console.log("Promise resolved");
  });

console.log("End");`,
  description: 'Shows how promises work with the microtask queue (simplified)',
  highlightLines: [0, 2, 3, 4, 7],
  steps: [
    {
      callStack: [{ id: uuidv4(), name: 'main()', type: 'sync' }],
      explanation: 'Main function is pushed to the call stack'
    },
    {
      callStack: [
        { id: uuidv4(), name: 'main()', type: 'sync' },
        { id: uuidv4(), name: 'console.log("Start")', type: 'sync' }
      ],
      explanation: 'console.log("Start") is pushed to the call stack'
    },
    {
      callStack: [{ id: uuidv4(), name: 'main()', type: 'sync' }],
      explanation: 'console.log("Start") is executed and removed from the stack. "Start" is printed to the console.'
    },
    {
      callStack: [
        { id: uuidv4(), name: 'main()', type: 'sync' },
        { id: uuidv4(), name: 'Promise.resolve()', type: 'async' }
      ],
      explanation: 'Promise.resolve() is pushed to the call stack'
    },
    {
      callStack: [
        { id: uuidv4(), name: 'main()', type: 'sync' },
        { id: uuidv4(), name: '.then(callback)', type: 'async' }
      ],
      explanation: 'Promise resolves immediately and .then() registers a callback'
    },
    {
      callStack: [{ id: uuidv4(), name: 'main()', type: 'sync' }],
      callbackQueue: [{ id: uuidv4(), name: 'Promise.then callback', type: 'callback' }],
      explanation: 'The Promise callback is added to the microtask queue (shown here as the regular queue for simplicity)'
    },
    {
      callStack: [
        { id: uuidv4(), name: 'main()', type: 'sync' },
        { id: uuidv4(), name: 'console.log("End")', type: 'sync' }
      ],
      callbackQueue: [{ id: uuidv4(), name: 'Promise.then callback', type: 'callback' }],
      explanation: 'console.log("End") is pushed to the call stack'
    },
    {
      callStack: [{ id: uuidv4(), name: 'main()', type: 'sync' }],
      callbackQueue: [{ id: uuidv4(), name: 'Promise.then callback', type: 'callback' }],
      explanation: 'console.log("End") is executed and removed from the stack. "End" is printed to the console.'
    },
    {
      callStack: [],
      callbackQueue: [{ id: uuidv4(), name: 'Promise.then callback', type: 'callback' }],
      explanation: 'main() completes execution and is removed from the call stack. The stack is now empty.'
    },
    {
      callStack: [{ id: uuidv4(), name: 'Promise.then callback', type: 'callback' }],
      callbackQueue: [],
      explanation: 'Event Loop sees that the Call Stack is empty and moves the Promise callback to the Stack'
    },
    {
      callStack: [
        { id: uuidv4(), name: 'Promise.then callback', type: 'callback' },
        { id: uuidv4(), name: 'console.log("Promise resolved")', type: 'sync' }
      ],
      explanation: 'console.log() within the Promise callback is pushed to the stack'
    },
    {
      callStack: [{ id: uuidv4(), name: 'Promise.then callback', type: 'callback' }],
      explanation: 'console.log("Promise resolved") executes and is removed from the stack'
    },
    {
      callStack: [],
      explanation: 'The Promise callback completes and is removed from the stack. Execution complete.'
    }
  ]
};

// New example: Promise Chaining
const promiseChainExample: Example = {
  title: 'Promise Chaining',
  code: `console.log('Start');

Promise.resolve('Step 1')
  .then(result => {
    console.log(result);
    return 'Step 2';
  })
  .then(result => {
    console.log(result);
    return 'Step 3';
  })
  .then(result => {
    console.log(result);
  });

console.log('End');`,
  description: 'Demonstrates how Promise chaining works in the event loop',
  highlightLines: [0, 2, 3, 4, 5, 7, 8, 9, 11, 12, 15],
  steps: [
    {
      callStack: [{ id: uuidv4(), name: 'main()', type: 'sync' }],
      explanation: 'Main function is pushed to the call stack'
    },
    {
      callStack: [
        { id: uuidv4(), name: 'main()', type: 'sync' },
        { id: uuidv4(), name: 'console.log("Start")', type: 'sync' }
      ],
      explanation: 'console.log("Start") is executed'
    },
    {
      callStack: [
        { id: uuidv4(), name: 'main()', type: 'sync' },
        { id: uuidv4(), name: 'Promise.resolve("Step 1")', type: 'async' }
      ],
      explanation: 'Promise.resolve() creates a resolved promise with "Step 1"'
    },
    {
      callStack: [{ id: uuidv4(), name: 'main()', type: 'sync' }],
      callbackQueue: [{ id: uuidv4(), name: 'First .then callback', type: 'callback' }],
      explanation: 'First .then callback is queued as a microtask'
    },
    {
      callStack: [
        { id: uuidv4(), name: 'main()', type: 'sync' },
        { id: uuidv4(), name: 'console.log("End")', type: 'sync' }
      ],
      callbackQueue: [{ id: uuidv4(), name: 'First .then callback', type: 'callback' }],
      explanation: 'console.log("End") is executed'
    },
    {
      callStack: [],
      callbackQueue: [{ id: uuidv4(), name: 'First .then callback', type: 'callback' }],
      explanation: 'Main function completes, stack is empty'
    },
    {
      callStack: [{ id: uuidv4(), name: 'First .then callback', type: 'callback' }],
      explanation: 'First .then callback is moved to the stack'
    },
    {
      callStack: [
        { id: uuidv4(), name: 'First .then callback', type: 'callback' },
        { id: uuidv4(), name: 'console.log("Step 1")', type: 'sync' }
      ],
      explanation: 'Logging "Step 1"'
    },
    {
      callStack: [],
      callbackQueue: [{ id: uuidv4(), name: 'Second .then callback', type: 'callback' }],
      explanation: 'First callback completes, second .then is queued'
    },
    {
      callStack: [{ id: uuidv4(), name: 'Second .then callback', type: 'callback' }],
      explanation: 'Second .then callback is moved to the stack'
    },
    {
      callStack: [
        { id: uuidv4(), name: 'Second .then callback', type: 'callback' },
        { id: uuidv4(), name: 'console.log("Step 2")', type: 'sync' }
      ],
      explanation: 'Logging "Step 2"'
    },
    {
      callStack: [],
      callbackQueue: [{ id: uuidv4(), name: 'Third .then callback', type: 'callback' }],
      explanation: 'Second callback completes, third .then is queued'
    },
    {
      callStack: [{ id: uuidv4(), name: 'Third .then callback', type: 'callback' }],
      explanation: 'Third .then callback is moved to the stack'
    },
    {
      callStack: [
        { id: uuidv4(), name: 'Third .then callback', type: 'callback' },
        { id: uuidv4(), name: 'console.log("Step 3")', type: 'sync' }
      ],
      explanation: 'Logging "Step 3"'
    },
    {
      callStack: [],
      explanation: 'All promises in the chain have been resolved'
    }
  ]
};

// New example: Async/Await
const asyncAwaitExample: Example = {
  title: 'Async/Await',
  code: `async function fetchData() {
  console.log('Fetching...');
  
  const result = await new Promise(
    resolve => setTimeout(
      () => resolve('Data'), 
      1000
    )
  );
  
  console.log(result);
}

console.log('Start');
fetchData();
console.log('End');`,
  description: 'Shows how async/await works under the hood',
  highlightLines: [0, 1, 3, 4, 5, 6, 7, 9, 12, 13, 14],
  steps: [
    {
      callStack: [{ id: uuidv4(), name: 'main()', type: 'sync' }],
      explanation: 'Main function begins execution'
    },
    {
      callStack: [
        { id: uuidv4(), name: 'main()', type: 'sync' },
        { id: uuidv4(), name: 'console.log("Start")', type: 'sync' }
      ],
      explanation: 'Logging "Start"'
    },
    {
      callStack: [
        { id: uuidv4(), name: 'main()', type: 'sync' },
        { id: uuidv4(), name: 'fetchData()', type: 'async' }
      ],
      explanation: 'Async function fetchData is called'
    },
    {
      callStack: [
        { id: uuidv4(), name: 'fetchData()', type: 'async' },
        { id: uuidv4(), name: 'console.log("Fetching...")', type: 'sync' }
      ],
      explanation: 'Logging "Fetching..."'
    },
    {
      callStack: [{ id: uuidv4(), name: 'main()', type: 'sync' }],
      webAPIs: [{ id: uuidv4(), name: 'Promise/Timer', type: 'async', duration: 1000 }],
      explanation: 'await suspends execution of fetchData, timer starts'
    },
    {
      callStack: [
        { id: uuidv4(), name: 'main()', type: 'sync' },
        { id: uuidv4(), name: 'console.log("End")', type: 'sync' }
      ],
      webAPIs: [{ id: uuidv4(), name: 'Promise/Timer', type: 'async', duration: 1000 }],
      explanation: 'Main function continues, logging "End"'
    },
    {
      callStack: [],
      webAPIs: [{ id: uuidv4(), name: 'Promise/Timer', type: 'async', duration: 1000 }],
      explanation: 'Main function completes, waiting for timer'
    },
    {
      callStack: [],
      callbackQueue: [{ id: uuidv4(), name: 'Promise Resolution', type: 'callback' }],
      explanation: 'Timer completes, Promise resolves'
    },
    {
      callStack: [{ id: uuidv4(), name: 'fetchData() continuation', type: 'async' }],
      explanation: 'Async function continues after await'
    },
    {
      callStack: [
        { id: uuidv4(), name: 'fetchData() continuation', type: 'async' },
        { id: uuidv4(), name: 'console.log("Data")', type: 'sync' }
      ],
      explanation: 'Logging the resolved value "Data"'
    },
    {
      callStack: [],
      explanation: 'Async function completes'
    }
  ]
};

// Export all examples
export const examples: Example[] = [
  simpleTimeoutExample,
  zeroTimeoutExample,
  promiseExample,
  promiseChainExample,
  asyncAwaitExample
];