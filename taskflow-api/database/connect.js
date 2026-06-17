const { MongoClient } = require("mongodb");
require("dotenv").config();

let database;
let client;

const connectDB = async () => {
  try {
    if (client && database) {
      return database;
    }
    
    
    client = new MongoClient(process.env.MONGODB_URL);
    await client.connect();
    
    
    database = client.db("contactsdb");
    
    console.log("MongoDB Connected to contactsdb");
    return database;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

const getDB = () => {
  if (!database) {
    throw new Error("Database not connected. Call connectDB() first.");
  }
  return database;
};

const closeDB = async () => {
  if (client) {
    await client.close();
    client = null;
    database = null;
    console.log("MongoDB Disconnected");
  }
};

module.exports = { connectDB, getDB, closeDB };