const express = require("express");

const PORT = 5000;
const app = express();

const productRoutes = require("./route/app");

app.use(express.json());
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello Server....");
});

app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);
