const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const olduploadProductImage = async (req, res) => {
  if (!req.files) {
    throw new Error(`No file added`);
  }
  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith("image")) {
    throw new Error(`Choose an image`);
  }
  const imagePath = path.join(
    __dirname,
    "../public/uploads/",
    productImage.name
  );

  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new Error("Image too large. max size 1MB");
  }
  await productImage.mv(imagePath);

  res.status(200).json({ image: { src: `/uploads/${productImage.name}` } });
};

const uploadProductImage = async (req, res) => {
  const response = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  res.status(200).json({ image: { src: response.secure_url } });
};

module.exports = { uploadProductImage };
