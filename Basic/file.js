const fs = require("fs");
fs.readFile("file.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("Error", err);
  }
  console.log(data);
});

console.log("File Read Requesed.");

// OutPut

// File Read Requesed.
// abndsssssssssssssssssss  // because nodejs doesn't block while reading file it's continues exicuting
