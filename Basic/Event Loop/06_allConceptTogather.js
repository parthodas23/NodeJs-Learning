// Quick Summary Table

// Concept	                        Type	               Runs in	Example	            Priority
// Synchronous code	Blocking	Call Stack	                      console.log()	      Highest
// Callback	Async	             Callback                      Queue	setTimeout()	Low
// Promise	Async	             Microtask Queue	          Promise.then()	Higher than callback
// Async/Await	Async (Promise-based)	Microtask Queue	       await something()	Same as Promise

console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => console.log("Promise"));

(async function () {
  console.log("After async");
  await null;
  console.log("After await.");
})();

console.log("End");
