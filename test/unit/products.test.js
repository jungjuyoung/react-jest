const productController = require("../../controller/products");
const productModel = require("../../models/Product");
const httpMocks = require("node-mocks-http");
const newProduct = require("../data/product.json");

//mock 함수 생성
productModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe("Product Controller Create", () => {
  beforeEach(() => {
    req.body = newProduct; // 매번 실행할 때마다 req.body에 newProduct 넣어줌
  });

  it("shold have a createProduct function", () => {
    expect(typeof productController.createProduct).toBe("function");
  });

  it("should call productModel.create", async () => {
    // productController.createProduct() 호출이 될 때
    // productModel.create 호출이 되는지 (mongDB에 model create해주는 함수)
    await productController.createProduct(req, res, next); // 함수안에 productModel.craete함수를 호출 함.
    expect(productModel.create).toBeCalledWith(req.body);
  });

  it("should return 201 statement code", async () => {
    await productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return json body in response", async () => {
    productModel.create.mockReturnValue(newProduct);
    await productController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct);
  });
});
