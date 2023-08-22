const express = require('express')
const productsRouter = express.Router();

const {
    createProduct, getAllProducts
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



module.exports = productsRouter;