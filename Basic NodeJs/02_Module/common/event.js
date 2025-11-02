const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

eventEmitter.on("greet", (name) => {
  console.log(`Hello ${name}`);
});

eventEmitter.emit("greet", "Partha Das");
