const productModel = require("../models/Product");

exports.createProduct = async (req, res, next) => {
  try {
    const createdProduct = await productModel.create(req.body);
    // console.log(`createdProduct : ${JSON.stringify(createdProduct)}`);
    // {
    //   "name":"glove",
    //   "description":"good usability",
    //   "price":15000
    // }
    // 이렇게 나올 줄 알았는데 예상과 달리  {} 이렇게 나옴
    // mongDB의 처리는 비동기이기 떄문에 response되기 전에 출력해서 그런것.
    // 비동기 테스트 코드는 어떻게 해야할까?
    // async await으로 데이터가 전달된것이 확실할 때 테스트 함.
    res.status(201).json(createdProduct);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const allProducts = await productModel.find({});
    res.status(200).json(allProducts);
  } catch (error) {
    console.log(`error: ${error}`);
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
      }
    );
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(
      req.params.productId
    );
    if (deletedProduct) {
      res.status(200).json(deletedProduct);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};
