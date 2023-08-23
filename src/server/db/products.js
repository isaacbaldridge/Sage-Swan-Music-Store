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
const deleteProductById = async(productId) => {
    try{
        const {rows:[product]} = await db.query(`
        DELETE FROM products WHERE id = $1 RETURNING *;
        `,[productId])
        return product
    }catch(err) {
        throw err
    }
}

const getAllProducts = async ()=>{
    try{
      const {rows} = await db.query
      (` SELECT * FROM products;`) 
        return rows;

    }catch (err){
       throw err;
    }
}

const getProductById = async (productId)=>{
    try{
        const {rows: [product]} = await db.query(`
       SELECT * FROM products WHERE id= $1;
        `, [productId]);
        return product 
    }catch(err){
        throw err
    }
}

const getProductByCategory = async (productCategory)=>{
    try{
        const {rows} = await db.query(`
       SELECT * FROM products WHERE category= $1;
        `, [productCategory])
        return rows
    }catch(err){
        throw err
    }
}

async function updateProductById(productId, fields = {}){
    const setString = Object.keys(fields).map(
      (key, index) => `"${key}" = $${index + 1}`  
    ).join(", ");

    try{
       
        const{rows: [product]} = await db.query(`
        UPDATE products 
        SET ${setString}
        WHERE id = ${productId}
        RETURNING *;
        `, Object.values(fields))
       return product
       
    }catch(err){
        throw err
    }
}

module.exports ={
    createProduct,
    getAllProducts,
    getProductById,
    getProductByCategory,
    deleteProductById,
    updateProductById

}