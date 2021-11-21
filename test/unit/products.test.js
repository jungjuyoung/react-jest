const productController = require("../../controller/products");
const productModel = require("../../models/Product");
// 무엇을 테스트 할 것인가? prduct를 DB에 CRUD 테스트.
// C: create product 테스트
// 1. productControlle에 createProduct함수가 있는지 확인.
// 2.  productControlle에 createProduct 함수의 기능 unit 테스트
// unit 테스트를 하며 실제 DB에 영향이 가기면 안돼기 때문에 mock 함수를 작성하여 DB의 데이터를 로컬로 복사해와서 테스트한다.

// mock 함수
// const mockFunction = jest.fn();
// mockFunction()
// mockFunction('hello')
// console.log(mockFunction) //hello
// expect(mockFunction).toBeCalledWith('hello')
// expect(mockFunction).toBelCalledTimes(2)

//mock 함수 생성
productModel.create = jest.fn();

describe("Product Controller Create", () => {
  it("shold have a createProduct function", () => {
    expect(typeof productController.createProduct).toBe("function");
  });

  it("should call productModel.create", () => {
    // productController.createProduct() 호출이 될 때
    // productModel.create 호출이 되는지 (mongDB에 model create해주는 함수)
    productController.createProduct();
    expect(productModel.create).toBeCalled();
  });
});
