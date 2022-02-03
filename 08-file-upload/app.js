require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");

const connectDB = require("./DB/connect");
const productRouter = require("./routes/productsRouter");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.use(express.static("./public"));
app.get("/", (req, res) => {
  res.send(`<h1>File Upload Starter</h1>`);
});
app.use("/api/v1/products", productRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.mongo_URL);
    app.listen(port, console.log(`listening @ ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
