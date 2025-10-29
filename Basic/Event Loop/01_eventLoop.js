console.log("1"); // runs immediately
setTimeout(() => {
  console.log("2"); // sent to web api -> timer starts
}, 1000);
console.log("3"); // this also runs immediately

// 1️⃣ console.log("1") → runs immediately
// 2️⃣ setTimeout(...) → sent to Web API → timer starts
// 3️⃣ console.log("3") → runs immediately
// 4️⃣ After 1 second → callback goes to queue
// 5️⃣ Event loop sees the stack is empty → runs the callback → prints "2"


console.log("A"); // this is syncronus

setTimeout(() => {
  console.log("B"); // this is callback queue (it's run in outside of the thread like in web api)
}, 0);

Promise.resolve().then(() => {
  console.log("C"); // this is micro-task queue
});

console.log("D"); // this is also syncronous
