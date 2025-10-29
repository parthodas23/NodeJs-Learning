const getData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data recived.");
    }, 2000);
  });
};

const fetchData = async () => {
  console.log("Fetching Data....");
  const data = await getData();

  console.log(data);
};

fetchData();
