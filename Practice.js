const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();
const os = require("os");

fs.writeFile(
  "file.txt",
  "Hello I'm Partha Doing great. How about you?",
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File written successfully.");
    }
  }
);

fs.readFile("file.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Data :", data);
  }
});

console.log(path.dirname("file.txt"));
console.log(path.join("/partha", "file", "file.txt"));

eventEmitter.on("greet", (name) => {
  console.log(`Hi ${name}`);
});

eventEmitter.emit("greet", "Emon Gosh");

console.log(os.freemem());
console.log(os.totalmem());
