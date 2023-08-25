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

module.exports = {createOrderProduct, getAllOrderProducts, deleteOrderProductByProductId  }