const request = require("supertest");
const app = require("../server");

describe("GET /tasks", () => {

  test("should return status 200", async () => {

    const response = await request(app)
      .get("/tasks");

    expect(response.statusCode).toBe(200);

  });

});