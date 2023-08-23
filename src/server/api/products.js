const express = require('express')
const productsRouter = express.Router();

const {
    createProduct, getAllProducts, getProductById, getProductByCategory, deleteProductById
} = require('../db');

productsRouter.get('/', async(req, res, next) =>{
    console.log("YOU LOSE")
    try{
        console.log("in product route");
        const products = await getAllProducts();

        res.send(products);
    }catch (err)
    {next(err)}
})

productsRouter.get('/:productId', async(req, res, next)=>{
  const {productId} = req.params
  try{
    const singleProduct = await getProductById(productId)
    res.send(singleProduct)
  }catch(err){
    next(err)
  }
})

productsRouter.get('/category/:productCategory', async(req, res, next)=>{
    const {productCategory} = req.params
    try{
      const products = await getProductByCategory(productCategory)
      res.send(products)
    }catch(err){
      next(err)
    }
  })
// revist later for performance changes (productsRouter.post, below)// 
  productsRouter.post('/', async(req, res, next)=>{
    const {category, brand, name, description, price, image} = req.body
    const productData ={}
    try{
      productData.category = category
      productData.brand = brand
      productData.name = name
      productData.description = description 
      productData.price = price
      productData.image = image
      const newProduct = await createProduct(productData)
      res.send(newProduct)
    }catch(err){
      next(err)
    }
  })

productsRouter.delete('/:id', async(req, res, next)=>{
    const {id} = req.params
    try{
        const deleteProduct = await deleteProductById(id)
        res.send(deleteProduct)
    }catch(err){
        next(err)
    }
})

module.exports = productsRouter;