const request = require("supertest");
const app = require("../server");

describe("GET /teams", () => {

  test("should return status 200", async () => {

    const response = await request(app)
      .get("/teams ");

    expect(response.statusCode).toBe(200);

  });

});