const { connectDB, closeDB } = require("../database/connect");

beforeAll(async () => {
  
  await connectDB();
  console.log("✅ Test setup: Database connected");
});
