function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data recived.");
    }, 2000);
  });
}

getData()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
