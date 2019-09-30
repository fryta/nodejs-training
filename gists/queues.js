setImmediate(() => console.log('immediate'));
setTimeout(() => console.log('timeout'), 0); // macrotask queue
Promise.resolve(1).then(() => console.log('promise')); // microtask queue
process.nextTick(() => console.log('nextTick')); // next tick queue
