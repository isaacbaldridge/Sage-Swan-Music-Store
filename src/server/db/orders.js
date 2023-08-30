const db = require('./client')
const createOrder = async ({user_id, fulfilled}) => {
    try{
        const{rows:[order]} = await db.query(`
        INSERT INTO orders(user_id, fulfilled )
        VALUES($1,$2)
        RETURNING *`, [user_id, fulfilled]
        ) 
        return order

    } catch(err){
        throw err
    }
 }
 const getAllOrders = async ()=>{
    try{
      const {rows} = await db.query
      (` SELECT * FROM orders;`) 
        return rows;

    }catch (err){
       throw err;
    }
}

async function getOrderById(orderId) {
    try {
      const { rows: [ order ]} = await db.query(`
        SELECT *
        FROM orders
        WHERE id = $1;
      `, [orderId]);
      console.log(order)
  
      if (!order) {
        throw {
          name: "Order Not Found Error",
          message: "Could not find an order with that orderid"
        };
      }return order
    }catch(error){
        throw error;
      }
    }


async function getJoinedOrder(orderId) {
  try {
    const {rows} = await db.query(`
    SELECT
    products.id AS product_id,
    orders.fulfilled,
    orders.user_id,
    order_products.quantity,
    products.name,
    products.price,
    products.brand,
    products.image
    FROM orders
    JOIN order_products ON orders.id = order_products.order_id
    JOIN products ON order_products.product_id = products.id
    WHERE order_products.order_id = $1;
    `, [orderId])
    return rows
  } catch (err) {
    throw err
  }
}

async function getOrderByUserId(userId) {
  try{
    const { rows : orders } = await db.query(`
    SELECT *
    FROM orders
    WHERE user_id =$1;
    `, [userId]);
    console.log(orders);
  
  if (!orders) {
    throw {
      name: "Order Not Found Error for user",
      message: "Could not find an order with that userid "
    };
  }
  const result = await Promise.all(Object.values(orders).map(order => getJoinedOrder(order.id)));
  console.log('result from gerOrderByuserId',result);
return result;

}catch(error){
    throw error;
  }

}
  
 const deleteOrderById = async(orderId) => {
      try{
          const {rows:[order]} = await db.query(`
          DELETE FROM orders WHERE id = $1 RETURNING *;
          `,[orderId])
          return order
      }catch(err) {
          throw err
      }
  }

  const updateOrder = async(id,fields = {}) => {
      const setString = Object.keys(fields).map(
          (key, index) => `"${key}"=$${index + 1}`
      ).join(', ');
  
      // return early if this is called without fields
      if (setString.length === 0) {
          return;
      }
  
      try {
          const { rows: [order] } = await db.query(`
          UPDATE orders
          SET ${ setString }
          WHERE id=${ id }
          RETURNING *;
          `, Object.values(fields));
          return order;
      } catch (error) {
          throw error;
      }
  }

 module.exports = {createOrder,
getAllOrders, getOrderById, getOrderByUserId, deleteOrderById, updateOrder};