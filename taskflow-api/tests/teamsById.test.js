const request = require("supertest");
const app = require("../server");

describe("GET /teams/:id", () => {

  test("should return status 200", async () => {

    const response = await request(app)
      .get("/teams/6a30b6d9be03b0c91fd981f4");

    expect(response.statusCode).toBe(200);

  });

});