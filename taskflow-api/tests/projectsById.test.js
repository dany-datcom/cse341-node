const request = require("supertest");
const app = require("../server");
const { connectDB, getDB, closeDB } = require("../database/connect");
const { createTestData, cleanupTestData } = require("./test-helper");

let testProjectId;

beforeAll(async () => {
  await connectDB();
  const testData = await createTestData();
  testProjectId = testData.projectId;
  console.log("📝 Test Project ID:", testProjectId);
});

afterAll(async () => {
  await cleanupTestData();
  await closeDB();
  console.log("✅ Test teardown complete");
});

describe("GET /projects/:id", () => {
  test("should return status 200", async () => {
    const response = await request(app)
      .get(`/projects/${testProjectId}`);
    
    console.log("Response status:", response.status);
    console.log("Response body:", response.body);
    
    expect(response.statusCode).toBe(200);
  });
});