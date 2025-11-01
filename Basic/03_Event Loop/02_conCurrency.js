function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Fetched Successfull.");
    }, 1000);
  });
}

async function checkConcurrency() {
  const [data1, data2] = await Promise.all([getData(), getData()]);

  console.log("First Call", data1);
  console.log("Second Call", data2);
}
checkConcurrency();
