const db = require("./client")

const createOrderProduct = async({product_id, order_id, quantity}) =>{
    try{
        const {rows:[orderProduct]} = await db.query(`
         INSERT INTO order_products(product_id, order_id, quantity)
         VALUES($1, $2, $3)
         RETURNING *
        `, [product_id, order_id, quantity])
        return orderProduct
    }catch(err){
        throw err
    }
}

const getAllOrderProducts = async() => {
    try{
        const {rows} = await db.query(`
        SELECT * FROM order_products;
        `)
        return rows 
    } catch(err) {
        throw err 
    }
}

const deleteOrderProductByProductId = async(product_id, order_id) =>{
    try{
        const {rows: [orderProduct]} = await db.query(`
    DELETE FROM order_products
    WHERE product_id = $1
    AND order_id = $2
    RETURNING *
    `, [product_id, order_id])
    return orderProduct
} catch(err) {
    throw(err)
}
    
}

const deleteOrderProductByOrderId = async(order_id) => {
    try{
        const {rows} = await db.query(`
        DELETE FROM order_products
        WHERE order_id = $1
        RETURNING *
        `, [order_id])
        return rows 
    } catch(err){
        throw(err)
    }
}

const updateOrderProductByProductId = async(product_id, order_id, fields={}) => {
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}" = $${index + 1}`  
      ).join(", ");
      try{
       
        const{rows: [order_product]} = await db.query(`
        UPDATE order_products 
        SET ${setString}
        WHERE product_id = ${product_id}
        AND order_id = ${order_id}
        RETURNING *;
        `, Object.values(fields))
       return order_product
       
    }catch(err){
        throw err
    }
}

const getUserOrder = async(user_id) => {
  try{
    const{rows}= await db.query(`
      SELECT 
      order_products.product_id,
      order_products.order_id,
      orders.user_id,
      orders.fulfilled,
      products.brand,
      products.name,
      products.price,
      order_products.quantity,
      products.image
      FROM order_products
      JOIN products ON products.id = order_products.product_id
      JOIN orders ON orders.id = orders_products.order_id
      WHERE user_id = $1;
    `,[user_id])
    return rows 

  }catch(err){
    throw err
  }
}


module.exports = {
    createOrderProduct, 
    getAllOrderProducts,
     deleteOrderProductByProductId, 
    deleteOrderProductByOrderId,
    updateOrderProductByProductId,
    getUserOrder
     

}