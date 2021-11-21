const productController = require("../../controller/products");

describe("Product Controller Create", () => {
  it("shold have a createProduct function", () => {
    expect(typeof productController.createProduct).toBe("function");
  });
});
