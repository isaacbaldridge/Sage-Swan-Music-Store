const db = require('./client');
const { createUser } = require('./users');
const {createProduct} = require('./products');

const users = [
  {
    name: 'Emily Johnson',
    email: 'emily@example.com',
    password: 'securepass',
  },
  {
    name: 'Liu Wei',
    email: 'liu@example.com',
    password: 'strongpass',
  },
  {
    name: 'Isabella García',
    email: 'bella@example.com',
    password: 'pass1234',
  },
  {
    name: 'Mohammed Ahmed',
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
  },
  {
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
  },
  // Add more user objects as needed
];  
const products = [
  {
    category: "string",
  brand: "Fender",
  name: "Stratocaster",
  description: "A fine guitar",
  price: 1999.99,
  image: src = "strat.jpg"
  },

  {
    category: "string",
    brand: "Fender",
    name: "Telecaster",
    description: "For all your best country tunes",
    price: 2499.99,
    image: src = "telecaster_720.jpg"
},

{
  category: "string",
  brand: "Fender",
  name: "Jazzmaster",
  description: "For all your best jazzy tunes",
  price: 499.99,
  image: src = "jazzmaster_720.jpg"
},

{
  category: "string",
  brand: "Gibson",
  name: "Les Paul",
  description: "For all your classic rock tunes",
  price: 4999.99,
  image: src = "les_paul_360.jpg"
},

{
  category: "string",
  brand: "Gibson",
  name: "ES-335",
  description: "Feelin' bluesy?",
  price: 5499.99,
  image: src = "es335_720.jpg"
},

{
  category: "string",
  brand: "Yamaha",
  name: "PAC Series",
  description: "Great for beginners.",
  price: 299.99,
  image: src = "yahmahaguitar_720.jpg"
},
  
// ABOVE STRINGED INSTRUMENTS, BELOW PERCUSSION//
{
  category: "percussion",
  brand: "Gretsch",
  name: "Tambourine",
  description: "A fine tambourine",
  price: 99.99,
  image: src = "tambourine.jpg"
},

{
category: "percussion",
brand: "Yamaha",
name: "Cymbal",
description: "An okay cymbal",
price: 49.99,
image: src = "cymbal.jpg"
},

{
category: "percussion",
brand: "Ludwig",
name: "snare",
description: "An EPIC snare",
price: 299.99,
image: src = "snare.jpg"
},

{
category: "percussion",
brand: "Ludwig",
name: "Triangle",
description: "A very cute triangle",
price: 19.99,
image: src = "triangle.jpg"
},

{
category: "percussion",
brand: "Gretsch",
name: "Cow Bell",
description: "Because you ALWAYS need more cow bell.",
price: 89.99,
image: src = "cowbell.jpg"
},

];




const dropTables = async () => {
    try {
        await db.query(`
        DROP TABLE IF EXISTS users;
        `)

        await db.query(`
        DROP TABLE IF EXISTS products;
        `)
    }
    catch(err) {
        throw err;
    }
}

const createTables = async () => {
    try{
        await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL

        )`)

        await db.query(`CREATE TABLE products(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) DEFAULT 'name',
          category VARCHAR(255),
          brand VARCHAR(255),
          description TEXT,
          price DECIMAL,
          image TEXT
        )`)
        
    }
    catch(err) {
        throw err;
    }
}

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({name: user.name, email: user.email, password: user.password});
    }
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const insertProducts = async () =>{
  try{
    for (const product of products) {
      await createProduct(
        {category: product.category, brand: product.brand, name: product.name, description: product.description, price: product.price, image: product.image });
    }
    console.log('data insertion win ')
  } catch (error) {
    console.log('No insertion, error')
  }
};

const seedDatabse = async () => {
    try {
        db.connect();
        await dropTables();
        await createTables();
        await insertUsers();
        await insertProducts();
    }   
    catch (err) {
        throw err;
    }
    finally {
        db.end()
    }
}

seedDatabse()
