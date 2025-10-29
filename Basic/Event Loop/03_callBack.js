const getData = (callback) => {
  setTimeout(() => {
    callback("Data Ricived.");
  }, 2000);
};

getData((data) => {
  console.log(data);
});

// A callback is simply a function passed as an argument to another function,
// and it gets called (executed) later — usually after some task finishes.

// like “Call me back when you’re done”
