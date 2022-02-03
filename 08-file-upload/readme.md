# models

## product

- name * 
    - String

-  price * 
    - Number 

- image * 
    - String (this is a url to the image storage)

# controllers

## uploadImage

- takes a req.file and places that file on the local storage

## products
- createProduct
    - create a document on the DB of a new product
- getAllProducts
    - find all products on DB

# routes
## productsRouter
- '/'
    - post - createProduct
    -get - getAllProducts
- '/uploads'
    -post - uploadProductImage