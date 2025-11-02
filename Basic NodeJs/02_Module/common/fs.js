const fs = require("fs");

fs.writeFile(
  "./Basic/Module/common/fs.txt",
  "Currently Learning Nodejs",
  (err) => {
    console.log(err);
  }
);

fs.readFile("./Basic/Module/common/fs.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("File Data :", data);
  }
});
