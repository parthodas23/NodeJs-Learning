// res --> it's an outgoing http response, data sent to the claint through server

const express = require("express");
const app = express();

app.use(express.json());

app.get("/greet", (req, res) => {
  res.status(200).json({
    message: "Nice to meet you! Partha",
    time: new Date().toISOString(),
  });
});

app.listen(3000, () => {
  console.log("Server listening on the port 3000");
});
