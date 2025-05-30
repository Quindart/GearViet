import { response } from "express";
import crypto from "crypto";
import request from "supertest";

const baseURL = "http://localhost:8000";


var token;

describe("GET /category", () => {
  const newCategory = {
    id: "crypto.randomUUID()",
    name: "test category",
  };
  beforeAll(async () => {
    await request(baseURL).post("/category").send(newCategory);
  });
  afterAll(async () => {
    await request(baseURL).delete(`/category/${newCategory.id}`);
  });

  it("should return 200", async () => {
    const response = await request(baseURL).get("/category");
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });
});

describe("POST /category", () => {
  const newCategory = {
    id: "crypto.randomUUID()",
    name: "test 2345",
  };

  beforeAll(async () => {
    const res = await request(baseURL)
      .post("/auth/login")
      .send({ username: "admintest", password: "123456aA@" });
    token = res.body.token;
    await request(baseURL).post("/category").send(newCategory);
  });

  afterAll(async () => {
    await request(baseURL).delete(`/category/${newCategory.id}`);
  });

  it("should return 200", async () => {
    const response = await request(baseURL)
      .post("/category")
      .send(newCategory)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.category.name).toBe(newCategory.name);
    expect(response.body.category.subcategory.length).toBe(0);
  });

  it("Add duplicate data", async () => {
    const response = await request(baseURL)
      .post("/category")
      .send(newCategory)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(409);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Category name already exist");
  });

  it("Not logged in user", async () => {
    const response = await request(baseURL).post("/category").send(newCategory);
    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toBe("Unauthenticated");
  });
});
