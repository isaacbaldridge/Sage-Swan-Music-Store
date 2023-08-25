const db = require('./client');
const { createUser } = require('./users');
const {createProduct, getAllProducts} = require('./products');
const {createOrder} = require('./orders');

const users = [
  { name: 'Porsha',
  username: 'Porsha123',
  password: 'P12A',
  email: 'porshahere@gmail.com',
  address: '5321 chicago south',
  isAdmin: true
  },
  { 
    name: 'Taco',
    username: 'tacotuesday123',
    password: 'hq12',
    email: 'mytaco123@yahoo.com',
    address: '123 Taco Bell Rd',
    isAdmin: true
  },
  {
    name: 'Emily Johnson',
    username: 'EmJo',
    password: 'securepass',
    email: 'emily@example.com',
    address: '123 Street, Seattle WA',
    isAdmin: false
  },
  {
    name: 'Liu Wei',
    username: 'LiuWei2023',
    password: 'strongpass',
    email: 'liu@example.com',
    address: '245 1st Ave, NY',
    isAdmin: false
  },
  {
    name: 'Isabella García',
    username: 'GarciaIs45',
    password: 'pass1234',
    email: 'bella@example.com',
    address: '1212 Last Address Ave, Denver CO',
    isAdmin: false
  },
  {
    name: 'Mohammed Ahmed',
    username: 'mohan967',
    password: 'mysecretpassword',
    email: 'mohammed@example.com',
    address: '984 yearly lane, washington DC',
    isAdmin: false
  },
  {
    name: 'John Smith',
    username: 'Johnny',
    password: 'joe12356',
    email: 'john@example.com',
    address: '24th street, Washington',
    isAdmin : false
  },
  // Add more user objects as needed

];  
const products = [
  {
    category: "string",
  brand: "Fender",
  name: "Stratocaster",
  description: "A fine guitar",
  price: 1999.99
  // image: src = "strat.jpg"
  },

  {
    category: "string",
    brand: "Fender",
    name: "Telecaster",
    description: "For all your best country tunes",
    price: 2499.99
    // image: src = "telecaster_720.jpg"
},

{
  category: "string",
  brand: "Fender",
  name: "Jazzmaster",
  description: "For all your best jazzy tunes",
  price: 499.99
  // image: src = "jazzmaster_720.jpg"
},

{
  category: "string",
  brand: "Gibson",
  name: "Les Paul",
  description: "For all your classic rock tunes",
  price: 4999.99
  // image: src = "les_paul_360.jpg"
},

{
  category: "string",
  brand: "Gibson",
  name: "ES-335",
  description: "Feelin' bluesy?",
  price: 5499.99
  // image: src = "es335_720.jpg"
},

{
  category: "string",
  brand: "Yamaha",
  name: "PAC Series",
  description: "Great for beginners.",
  price: 299.99
  // image: src = "yahmahaguitar_720.jpg"
},
  
// ABOVE STRINGED INSTRUMENTS, BELOW PERCUSSION//
{
  category: "percussion",
  brand: "Gretsch",
  name: "Tambourine",
  description: "A fine tambourine",
  price: 99.99
  // image: src = "tambourine.jpg"
},

{
category: "percussion",
brand: "Yamaha",
name: "Cymbal",
description: "An okay cymbal",
price: 49.99
// image: src = "cymbal.jpg"
},

{
category: "percussion",
brand: "Ludwig",
name: "snare",
description: "An EPIC snare",
price: 299.99
// image: src = "snare.jpg"
},

{
category: "percussion",
brand: "Ludwig",
name: "Triangle",
description: "A very cute triangle",
price: 19.99
// image: src = "triangle.jpg"
},

{
category: "percussion",
brand: "Gretsch",
name: "Cow Bell",
description: "Because you ALWAYS need more cow bell.",
price: 89.99
// image: src = "cowbell.jpg"
},

];

const orders = [
  {
  user_id: 3,
  fulfilled: false

  },
  {
    user_id: 5,
    fulfilled: true

    },
    {
      user_id: 2,
      fulfilled: true

      },
      {
        user_id: 7,
        fulfilled: false

        },
        {
          user_id: 7,
          fulfilled: true

          },

]






const dropTables = async () => {
    try {
      await db.query(`
        DROP TABLE IF EXISTS orders;
        `)

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
          username varchar(30) UNIQUE NOT NULL,
          password TEXT NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          address TEXT,
          isAdmin BOOLEAN DEFAULT false 
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
          
          await db.query(`
          CREATE TABLE orders(
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            fulfilled BOOLEAN
            
          )`)
  
    }
    catch(err) {
        throw err;
    }
}

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({name: user.name, username: user.username, password: user.password, email: user.email, address: user.address, isAdmin: user.isAdmin});
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

const insertOrders = async () => {
  try {
    for (const order of orders) {
      await createOrder({user_id: order.user_id, fulfilled: order.fulfilled});
    }
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const seedDatabse = async () => {
    try {
        db.connect();
        await dropTables();
        await createTables();
        await insertUsers();
        await insertProducts();
        await insertOrders();
    }   
    catch (err) {
        throw err;
    }
    finally {
        db.end()
    }
}

seedDatabse()