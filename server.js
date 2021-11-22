const express = require("express");

const PORT = 5000;
const app = express();
const productRoutes = require("./routes/product");
const config = require("./config/key");
const mongoose = require("mongoose");

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`mongDB Connected....`))
  .catch(err => console.log(err));

app.use(express.json()); // req.body에 클라이언트에서 전달하는 json을 처리하는 미들웨어
app.use(express.urlencoded({ extended: true })); // req.body에 클라이언트에서 전달하는 form을 처리하는 미들웨어
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello Server....");
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

// app.listen(PORT);
// console.log(`Running on http://localhost:${PORT}`);

module.exports = app;
