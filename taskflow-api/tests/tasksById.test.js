const request = require("supertest");
const app = require("../server");

describe("GET /tasks/:id", () => {

  test("should return status 200", async () => {

    const response = await request(app)
      .get("/tasks/6a2b93a74970762f52f8cf66");

    expect(response.statusCode).toBe(200);

  });

});