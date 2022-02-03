const express = require('express');
const router = express.Router();

const {createProduct, getAllProducts} = require('../controller/productController');
const {uploadProductImage} = require('../controller/uploadController');


router.route('/').get(getAllProducts).post(createProduct);
router.route('/uploads').post(uploadProductImage);

module.exports = router;