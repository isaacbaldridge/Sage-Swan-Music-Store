const express = require('express')
const ordersRouter = express.Router();
const { requireUser } = require('./utils');

const {
    createOrder, getAllOrders, getOrderById, deleteOrderById, updateOrder
} = require('../db');

ordersRouter.get('/', async(req, res, next) =>{
    try{
        const orders = await getAllOrders();

        res.send(orders);
    }catch (err)
    {next(err)}
})

ordersRouter.post('/', requireUser, async(req, res, next) =>{
    const { fulfilled, order_total} = req.body;
    const orderData = {};
    try{ 
        orderData.user_id = req.user.id;
        orderData.fulfilled = fulfilled;
        orderData.order_total = order_total;


        const order = await createOrder(orderData);
        if (order) {
            res.send(order);
        }else {
            next({
                name:'order creation error',
                message: 'there was an error creating your order'
            })
        }

    }catch ({
        name,message
    })
    {next({name,message})}
});


ordersRouter.delete('/:id', async (req, res, next) => {
    const {id} = req.params
    try {
      const deleteorder = await deleteOrderById(id);
      res.send(deleteorder);
  } catch (error) {
      next(error);
  }
  });


ordersRouter.get('/:id', async (req, res, next) => {
    const {id} = req.params
    try {
        const singleorder = await getOrderById(id)
      res.send(singleorder)
    } catch (error) {
      next(error)
    }
  })

  ordersRouter.patch('/:id', async (req, res, next) => {
    const {id} = req.params
    const {fulfilled, order_total} = req.body;
    const updateFields = {};

  if (fulfilled) {
    updateFields.fulfilled = fulfilled;
  }

  if (order_total) {
    updateFields.order_total = order_total;
  } 
    try{ 
        const originalOrder = await getOrderById(id);

        const updatedOrder = await updateOrder(id, updateFields);
      res.send({ order: updatedOrder })

    } catch ({name,message}) {
        next({name,message})
    }

  })

module.exports = ordersRouter;










