const request = require("supertest");
const app = require("../server");
const { connectDB, getDB, closeDB } = require("../database/connect");
const { createTestData, cleanupTestData } = require("./test-helper");

let testUserId;

beforeAll(async () => {
  await connectDB();
  const testData = await createTestData();
  testUserId = testData.userId;
  console.log("📝 Test User ID:", testUserId);
});

afterAll(async () => {
  await cleanupTestData();
  await closeDB();
  console.log("✅ Test teardown complete");
});

describe("GET /users/:id", () => {
  test("should return status 200", async () => {
    const response = await request(app)
      .get(`/users/${testUserId}`);
    
    console.log("Response status:", response.status);
    console.log("Response body:", response.body);
    
    expect(response.statusCode).toBe(200);
  });
});