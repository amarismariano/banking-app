require("dotenv").config({ path: ".env.test" });
const request = require("supertest");
const app = require("../../server");
const mongoose = require("mongoose");
const User = require("../../models/user.model");

let token;

beforeAll(async () => {
  await User.deleteMany(); // Asegúrate de que la base de datos esté limpia

  const user = await User.create({
    username: "testuser21",
    password: "testpassword",
  });

  console.log("User created:", user);

  const res = await request(app).post("/api/auth/login").send({
    username: "testuser21",
    password: "testpassword",
  });

  console.log("LOGIN RESPONSE:", res.body);

  token = res.body.token;
  console.log("Token:", token);
});

afterAll(async () => {
  await User.deleteMany();
  await mongoose.connection.close();
});

describe("Auth API", () => {
  it("should login a user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: "testuser21",
      password: "testpassword",
    });

    console.log("LOGIN RESPONSE:", res.body);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should register a new user", async () => {
    await User.deleteMany();

    const res = await request(app).post("/api/auth/register").send({
      username: "newuser",
      password: "newpassword",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should not login with invalid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: "wronguser",
      password: "wrongpassword",
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("error", "Credenciales inválidas");
  });
});
