const request = require("supertest");
const app = require("../server");

describe("GET /projects/:id", () => {

  test("should return status 200", async () => {

    const response = await request(app)
      .get("/projects/6a2226eaccf775407f061a98");

    expect(response.statusCode).toBe(200);

  });

});