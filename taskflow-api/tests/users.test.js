const request = require("supertest");
const app = require("../server");
const { connectDB } = require("../database/connect");
const { createTestData, cleanupTestData } = require("./test-helper");

beforeAll(async () => {
  await connectDB();
  await createTestData();
});

afterAll(async () => {
  await cleanupTestData();
});

describe("GET /users", () => {
  test("should return status 200", async () => {
    const response = await request(app)
      .get("/users");
    
    expect(response.statusCode).toBe(200);
  });

  test("should return an array", async () => {
    const response = await request(app)
      .get("/users");
    
    expect(Array.isArray(response.body)).toBe(true);
  });
});