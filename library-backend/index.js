require("dotenv").config();

const connectToDb = require("./db");
const startServer = require("./server");

const BACKEND_PORT = process.env.BACKEND_PORT || 4000;

const main = async () => {
  await connectToDb(process.env.MONGODB_URI);
  startServer(BACKEND_PORT);
};

main();
