const request = require("supertest");
const app = require("../server");

describe("GET /users", () => {

  test("should return status 200", async () => {

    const response = await request(app)
      .get("/users");

    expect(response.statusCode).toBe(200);

  });

});