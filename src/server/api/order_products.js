const express = require('express')
const orderProductsRouter = express.Router();

const {createOrderProduct, getAllOrderProducts, deleteOrderProductByProductId, deleteOrderProductByOrderId, updateOrderProductByProductId, getUserOrder} = require('../db')

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

orderProductsRouter.delete('/byBothIds/:product_id/:order_id',async(req, res, next)=>{
    const{product_id, order_id} = req.params
    try{
        const deleteOrderProduct = await deleteOrderProductByProductId(product_id, order_id)
        res.send(deleteOrderProduct)
    }catch(err){
        next(err)
    }
})

orderProductsRouter.delete('/byOrderId/:order_id', async(req, res, next)=>{

    const{order_id} = req.params
    try{
        const deleteOrderProduct = await deleteOrderProductByOrderId(order_id)
        res.send(deleteOrderProduct)
    } catch(err){
        next(err)
    }
})

orderProductsRouter.patch('/update/:product_id/:order_id', async(req, res, next) =>{

  const {product_id, order_id} = req.params 
  try{
    const updateOrderProduct = await updateOrderProductByProductId(product_id, order_id, req.body)
    res.send(updateOrderProduct)
  } catch(err){
    next(err)
  }

})

orderProductsRouter.get('/userOrders/:user_id', async(req, res, next)=>{
    const{user_id} = req.params
    try{
        const userOrders = await getUserOrder(user_id)
        res.send(userOrders)
    }catch(err){
        next(err)
    }
})

module.exports = orderProductsRouter