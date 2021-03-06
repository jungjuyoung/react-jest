const productController = require("../../controller/products");
const productModel = require("../../models/Product");
const httpMocks = require("node-mocks-http");
const newProduct = require("../data/product.json");
const allProducts = require("../data/allProducts.json");

// mock 함수 생성
productModel.create = jest.fn();
productModel.find = jest.fn();
productModel.findById = jest.fn();
productModel.findByIdAndUpdate = jest.fn();
productModel.findByIdAndDelete = jest.fn();

const productId = "619bd01deedef1d6e070abc3";
const updatedProduct = {
  name: "updated name",
  description: "updated description",
};

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("Product Controller Create", () => {
  beforeEach(() => {
    req.body = newProduct; // 매번 실행할 때마다 req.body에 newProduct 넣어줌
  });

  // 프로덕트를 생성하는 함수가 있는제 확인하는 테스트
  it("should have a createProduct function", () => {
    expect(typeof productController.createProduct).toBe("function");
  });

  // data 저장 테스트
  it("should call productModel.create", async () => {
    // productController.createProduct() 호출이 될 때
    // productModel.create가 호출이 되는지 (mongDB에 model을 create해주는 함수)
    await productController.createProduct(req, res, next); // 함수안에 productModel.craete함수를 호출 함.
    expect(productModel.create).toBeCalledWith(req.body);
  });

  // 상태값 전달 테스트
  it("should return 201 statement code", async () => {
    await productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  // 결과값 json 반환 테스트
  it("should return json body in response", async () => {
    productModel.create.mockReturnValue(newProduct);
    await productController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct);
  });

  // 에러 처리를 위한 단위 테스트
  it("should handle errors", async () => {
    // 단위 테스트의 특성은 의존적이면 안됌.
    // 몽고DB에서 처리하는 부분은 문제가 없다는 것을 가정하는 단위 테스트이기 때문에
    // Mock함수를 이용해서 에러처리한다.
    const errorMessage = { message: "description property missing" };
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.create.mockReturnValue(rejectedPromise);
    await productController.createProduct(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe("Product Controller Get", () => {
  it("should have a getProduct function", () => {
    expect(typeof productController.getProduct).toBe("function");
  });

  it("should call productModel.find({})", async () => {
    await productController.getProduct(req, res, next);
    expect(productModel.find).toHaveBeenCalledWith({});
  });

  it("should return status 200 return", async () => {
    await productController.getProduct(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled).toBeTruthy();
  });

  it("should return json body in response", async () => {
    productModel.find.mockReturnValue(allProducts);
    await productController.getProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(allProducts);
  });

  it("should handle error", async () => {
    const errorMessage = { message: "Error finding all product data" };
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.find.mockReturnValue(rejectedPromise);
    await productController.getProduct(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

describe("Product Controller GetById", () => {
  it("should have a getProductById", () => {
    expect(typeof productController.getProductById).toBe("function");
  });

  it("should call productModel.findById", async () => {
    req.params.productId = productId;
    await productController.getProductById(req, res, next);
    expect(productModel.findById).toBeCalledWith(productId);
  });

  it("should return json body and response code 200", async () => {
    productModel.findById.mockReturnValue(newProduct);
    await productController.getProductById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newProduct);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return 404 when item doesn't exixt", async () => {
    productModel.findById.mockReturnValue(null);
    await productController.getProductById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handler error", async () => {
    const errorMessage = { message: "error" };
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.findById.mockReturnValue(rejectedPromise);
    await productController.getProductById(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

describe("Product Controller Update", () => {
  it("should have an updateProduct function", () => {
    expect(typeof productController.updateProduct).toBe("function");
  });
  it("should call productModel.findByIdAndUpdate", async () => {
    req.params.productId = productId;
    req.body = updatedProduct;
    await productController.updateProduct(req, res, next);
    expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
      productId,
      updatedProduct,
      { new: true }
    );
  });

  it("should return json body and response code 200", async () => {
    req.params.productId = productId;
    req.body = updatedProduct;
    productModel.findByIdAndUpdate.mockReturnValue(updatedProduct);
    await productController.updateProduct(req, res, next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(updatedProduct);
  });

  it("should return 404 when item doesn't exist", async () => {
    productModel.findByIdAndUpdate.mockReturnValue(null);
    await productController.updateProduct(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handler error", async () => {
    const errorMessage = { message: "Error" };
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
    await productController.updateProduct(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

describe("Product Controller Create", () => {
  it("should have a deleteProduct function", () => {
    expect(typeof productController.deleteProduct).toBe("function");
  });

  it("should call productModel.findByIdAndDelete", async () => {
    req.params.productId = productId;
    await productController.deleteProduct(req, res, next);
    expect(productModel.findByIdAndDelete).toBeCalledWith(productId);
  });

  it("should return 200 and deleted", async () => {
    const deletedProduct = {
      name: "deletedProduct",
      description: "it is deleted",
    };
    productModel.findByIdAndDelete.mockReturnValue(deletedProduct);
    await productController.deleteProduct(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(deletedProduct);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handle 404 when item doesn't exist", async () => {
    productModel.findByIdAndDelete.mockReturnValue(null);
    await productController.deleteProduct(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Error deleting" };
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
    await productController.deleteProduct(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});
