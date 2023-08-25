const express = require('express')
const orderProductsRouter = express.Router();

const {createOrderProduct, getAllOrderProducts, deleteOrderProductByProductId} = require('../db')

orderProductsRouter.get('/', async(req, res, next)=>{
    try{
        const orderProducts = await getAllOrderProducts()
        res.send(orderProducts)
    } catch(err){
        next(err)
    }
})

orderProductsRouter.post('/', async(req, res, next)=>{
    const{product_id, order_id, quantity} = req.body
    const orderProductData = {}
    try{
        orderProductData.product_id = product_id
        orderProductData.order_id = order_id
        orderProductData.quantity = quantity

        const newOrderProduct = await createOrderProduct(orderProductData)
        res.send(newOrderProduct)
    }catch(err){
        next(err)
    }
})

orderProductsRouter.delete('/:product_id/:order_id',async(req, res, next)=>{
    const{product_id, order_id} = req.params
    try{
        const deleteOrderProduct = await deleteOrderProductByProductId(product_id, order_id)
        res.send(deleteOrderProduct)
    }catch(err){
        next(err)
    }
})

module.exports = orderProductsRouter