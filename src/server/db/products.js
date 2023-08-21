const db = require('./client') 




const createProduct = async ({category, brand, name, description, price, image}) => {
    try{
        const {rows: [product] } = await db.query(`
        INSERT INTO products(category, brand, name, description, price, image)
        VALUES($1,$2,$3,$4,$5,$6)
        RETURNING *`, [category, brand, name, description, price, image]
        );
        return product;
    } catch (err){
        throw err;
    }
}

module.exports ={
    createProduct
    
}