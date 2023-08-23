const db = require('./client')
const createOrder = async ({user_id, fulfilled, order_total}) => {
    try{
        const{rows:[order]} = await db.query(`
        INSERT INTO orders(user_id, fulfilled,order_total )
        VALUES($1,$2,$3)
        RETURNING *`, [user_id, fulfilled, order_total]
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
getAllOrders, getOrderById, deleteOrderById, updateOrder};