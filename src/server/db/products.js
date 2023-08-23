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
        `, [productId])
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


module.exports ={
    createProduct,
    getAllProducts,
    getProductById,
    getProductByCategory
}