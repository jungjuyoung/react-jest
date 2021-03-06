const request = require("supertest");
const Product = require("../../models/Product");
const app = require("../../server");
const newProduct = require("../data/product.json");

let firstProduct;

describe("Product Integration Create", () => {
  it("POST / api / products", async () => {
    const response = await request(app).post("/api/products").send(newProduct);

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newProduct.name);
    expect(response.body.description).toBe(newProduct.description);
  });

  it("should return 500 on POST /api/products", async () => {
    const response = await request(app)
      .post("/api/products")
      .send({ name: "phone" });

    expect(response.statusCode).toBe(500);
    console.log("response body: ", response.body);
    expect(response.body).toStrictEqual({
      message:
        "Product validation failed: description: Path `description` is required.",
    });
  });
});

describe("Product Integration Read", () => {
  it("GET / api / products", async () => {
    const response = await request(app).get("/api/products");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].name).toBeDefined();
    expect(response.body[0].description).toBeDefined();
    firstProduct = response.body[0];
  });

  it("GET /api/product/:productId", async () => {
    const response = await request(app).get(
      "/api/products/" + firstProduct._id
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(firstProduct.name);
    expect(response.body.description).toBe(firstProduct.description);
  });

  it("GET id does not exist /api/products/:productID", async () => {
    const response = await request(app).get(
      "/api/products/" + "619a8397f317c82500e80577"
    );
    expect(response.statusCode).toBe(404);
  });
});

describe("Product Integration Update", () => {
  it("PUT /api/products", async () => {
    const res = await request(app)
      .put("/api/products/" + firstProduct._id)
      .send({ name: "updated name", description: "updated description" });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("updated name");
    expect(res.body.description).toBe("updated description");
  });

  it("should return 404 on PUT /api/products", async () => {
    const res = await request(app)
      .put("/api/products/" + "619a8397f317c82500e80599")
      .send({ name: "updated name", description: "updated description" });
    expect(res.statusCode).toBe(404);
  });
});

describe("Product Integration Delete", () => {
  it("DELETE /api/products", async () => {
    const res = await request(app)
      .delete("/api/products/" + firstProduct._id)
      .send();
    expect(res.statusCode).toBe(200);
  });
});
