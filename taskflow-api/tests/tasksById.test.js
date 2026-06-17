const request = require("supertest");
const app = require("../server");
const { connectDB, getDB, closeDB } = require("../database/connect");
const { createTestData, cleanupTestData } = require("./test-helper");

let testTaskId;

beforeAll(async () => {
  await connectDB();
  const testData = await createTestData();
  testTaskId = testData.taskId;
  console.log("📝 Test Task ID:", testTaskId);
});

afterAll(async () => {
  await cleanupTestData();
  await closeDB();
  console.log("✅ Test teardown complete");
});

describe("GET /tasks/:id", () => {
  test("should return status 200", async () => {
    const response = await request(app)
      .get(`/tasks/${testTaskId}`);
    
    console.log("Response status:", response.status);
    console.log("Response body:", response.body);
    
    expect(response.statusCode).toBe(200);
  });
});