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