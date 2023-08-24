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

module.exports = {createOrderProduct}