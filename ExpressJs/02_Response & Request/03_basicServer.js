const express = require("express");
const app = express();

app.use(express.json());

app.get("/hello", (req, res) => {
  console.log(`Get ------ Response`);
  console.log("Method", req.method);
  console.log("Url", req.url);

  res.send("Hello");
});

app.post("/users/:id", (req, res) => {
  console.log("Post ----- Request");
  console.log("ID", req.params);
  console.log("Query data", req.query);
  console.log("Body", req.body);
  console.log("Headers", req.headers);

  res.status(200).json({
    message: "This is Post Request",
    id: req.params,
    body: req.body,
    query: req.query,
  });
});

app.listen(3000, () => {
  console.log("Server listening on the post 3000");
});
