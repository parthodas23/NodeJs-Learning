try {
  const fs = require("fs");
  const data=fs.readFile("config.js", "utf-8");
  console.log(JSON.parse(data))
} catch (err) {
  console.log("A friendly error", err.massage);
}
