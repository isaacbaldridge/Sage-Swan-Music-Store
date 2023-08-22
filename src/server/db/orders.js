const db = require('./client')
const createOrder = async ({user_id, fulfilled, order_total}) => {
    try{
        const{rows:[order]} = await db.query(`
        INSERT INTO orders(user_id, fulfilled,order_total )
        VALUES($1,$2,$3)
        RETURNING *`, [user_id, fulfilled,order_total]
        ) 

    } catch(err){
        throw err
    }
 }

 module.exports = {createOrder};