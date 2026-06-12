const request = require("supertest");
const app = require("../server");

describe("GET /projects", () => {

  test("should return status 200", async () => {

    const response = await request(app)
      .get("/projects");

    expect(response.statusCode).toBe(200);

  });

});