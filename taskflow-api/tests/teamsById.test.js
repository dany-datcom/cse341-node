const request = require("supertest");
const app = require("../server");
const { connectDB, getDB, closeDB } = require("../database/connect");
const { createTestData, cleanupTestData } = require("./test-helper");

let testTeamId;

beforeAll(async () => {
  await connectDB();
  const testData = await createTestData();
  testTeamId = testData.teamId;
  console.log("📝 Test Team ID:", testTeamId);
});

afterAll(async () => {
  await cleanupTestData();
  await closeDB();
  console.log("✅ Test teardown complete");
});

describe("GET /teams/:id", () => {
  test("should return status 200", async () => {
    const response = await request(app)
      .get(`/teams/${testTeamId}`);
    
    console.log("Response status:", response.status);
    console.log("Response body:", response.body);
    
    expect(response.statusCode).toBe(200);
  });
});