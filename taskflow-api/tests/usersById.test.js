const request = require("supertest");
const app = require("../server");

describe("GET /users/:id", () => {

  test("should return status 200", async () => {

    const response = await request(app)
      .get("/users/6a2226a4ccf775407f061a97");

    expect(response.statusCode).toBe(200);

  });

});