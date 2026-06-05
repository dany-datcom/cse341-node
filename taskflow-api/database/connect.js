const { MongoClient } = require("mongodb");
require("dotenv").config();

let database;

const connectDB = async () => {
  const client = new MongoClient(process.env.MONGODB_URL);

  await client.connect();

  database = client.db("taskflow");

  console.log("MongoDB Connected");
};

const getDB = () => database;

module.exports = { connectDB, getDB };