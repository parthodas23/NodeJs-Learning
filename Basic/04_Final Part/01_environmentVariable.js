require("dotenv").config();

// collect --> process.env.VARIABLE_NAME

const port = process.env.PORT;
const api_key = process.env.API_KEY;

console.log(`Server running on the port ${port}`);
console.log(`This is the api key ${api_key}`);
