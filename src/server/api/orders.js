const express = require('express')
const ordersRouter = express.Router();
const { requireUser } = require('./utils');

const {
    createOrder, getAllOrders, getOrderById, deleteOrderById, updateOrder, getOrderByUserId
} = require('../db');

ordersRouter.get('/', async(req, res, next) =>{
    try{
        const orders = await getAllOrders();

        res.send(orders);
    }catch (err)
    {next(err)}
})

ordersRouter.post('/', requireUser, async(req, res, next) =>{
    const { fulfilled} = req.body;
    const orderData = {};
    try{ 
        orderData.user_id = req.user.id;
        orderData.fulfilled = fulfilled;


        
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

  ordersRouter.get('/cart/:user_id', requireUser, async (req, res, next) => {
    // let user_id  = req.user.id;
    const {user_id} = req.params
    console.log('user_id', user_id);
    try{
      const allOrdersByUser = await getOrderByUserId(user_id);
      // console.log ('getOrderByUserId :',allOrdersByUser);
      const orders = (Object.values(allOrdersByUser[allOrdersByUser.length - 1]).filter(
        order =>{
          if(order.fulfilled === false){
            return  true
          }
          else{
            return  false
          }
        }
      ))
      // console.log("testing")
      res.send ({orders})
    }
    catch ({name, message}){
      console.log("there was an error")
      next({name,message})
    }

  })


  // ordersRouter.patch('/cart/:user_id',requireUser, async (req, res, next) => {
  //   // let user_id  = req.user.id;
  //   const {user_id} = req.params
  //   console.log('user_id', user_id);
  //   try{
  //     const allOrdersByUser = await getOrderByUserId(user_id);
  //     console.log ('getOrderByUserId :',allOrdersByUser);
  //     const orders = (Object.values(allOrdersByUser[allOrdersByUser.length - 1]).filter(
  //       order =>{
  //         if(order.fulfilled === false){

  //           return  true
  //         }
  //         else{
  //           return  false
  //         }
  //       }
  //     ))
  //     console.log("testing")
  //     res.send ({orders})
  //   }
  //   catch ({name, message}){
  //     console.log("there was an error")
  //     next({name,message})
  //   }

  // })



  ordersRouter.get('/purchases',requireUser, async (req, res, next) => {
    let user_id  = req.user.id;
    // console.log('user_id', user_id);
    try{
      const allOrdersByUser = await getOrderByUserId(user_id);
      // console.log ('getOrderByUserId :',allOrdersByUser);

      const purchaseHistory = allOrdersByUser.map(order => 
        order.filter(product => product.fulfilled === true))
      res.send ({purchaseHistory})
    }
    catch ({name, message}){
      next({name,message})
    }

  })





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
    const {fulfilled} = req.body;
    const updateFields = {};

  if (fulfilled) {
    updateFields.fulfilled = fulfilled;
  }
  
  try{ 

        const updatedOrder = await updateOrder(id, updateFields);
        // console.log(updatedOrder)
        // console.log(updateFields)
        // console.log(req.body)
      res.send({ order: updatedOrder })

    } catch ({name,message}) {
        next({name,message})
    }

  })


  //Token -user_id:5 -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJiZWxsYUBleGFtcGxlLmNvbSIsImlhdCI6MTY5Mjk3NjEzNywiZXhwIjoxNjkzNTgwOTM3fQ.9i9YIFzSbhY2c_-YZ5HelbdThfN85Cd8mQefjiEXaX8
  //Token -user_id:7 ->eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwiaWF0IjoxNjkyOTc2NzYxLCJleHAiOjE2OTM1ODE1NjF9.I5a8-x4szX0QIRN1VKat3UKy54f0vbA4zpfT7Vc3HQs
  
  

module.exports = ordersRouter;










