const express = require("express");

const PORT = 5000;
const app = express();
const productRoutes = require("./route/app");

const config = require("./config/key");

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`mongDB Connected....`))
  .catch(err => console.log(err));

app.use(express.json());
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello Server....");
});

app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);
