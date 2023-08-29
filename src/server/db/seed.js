const db = require('./client');
const { createUser } = require('./users');
const {createProduct, getAllProducts} = require('./products');
const {createOrder} = require('./orders');
const {createOrderProduct} = require('./order_products')
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
  price: 1999.99,
  image: "https://media.sweetwater.com/api/i/b-original__w-300__h-450__q-85__f-webp__ha-02b1a530862db1db__hmac-953a4466d771f99528b84fe9095d07379cf22e70/images/guitars/StratAULR2S/US23023383/US23023383-body-large.jpg.auto.webp"
  },

  {
    category: "string",
    brand: "Fender",
    name: "Telecaster",
    description: "For all your best country tunes",
    price: 2499.99,
    image: src = "https://media.sweetwater.com/api/i/b-original__w-300__h-450__q-85__f-webp__ha-0bcc206cdcb5e438__hmac-ba6502cbb3217f67c37d40b28eae6fa7f01b131d/images/guitars/TeleAV251BB/V2324728/V2324728-body-large.jpg.auto.webp"
},

{
  category: "string",
  brand: "Fender",
  name: "Jazzmaster",
  description: "For all your best jazzy tunes",
  price: 499.99,
  image: src = "https://media.sweetwater.com/api/i/q-70__h-300__w-300__f-png__b-original/images/items/1800/JazzGFCAB-xlarge.jpg"
},

{
  category: "string",
  brand: "Gibson",
  name: "Les Paul",
  description: "For all your classic rock tunes",
  price: 4999.99,
  image: src = "https://media.sweetwater.com/api/i/b-original__w-300__h-450__q-85__f-webp__ha-98dafcb7cf4dc0d5__hmac-95366a2542c4794160432c87704058d37288aae0/images/guitars/LPS5SWHCSB/215030286/215030286-body-large.jpg.auto.webp"
},

{
  category: "string",
  brand: "Gibson",
  name: "ES-335",
  description: "Feelin' bluesy?",
  price: 5499.99,
  image: src = "https://media.sweetwater.com/api/i/q-70__h-300__w-300__f-png__b-original/images/items/1800/ES35F00SCNH-xlarge.jpg"
},

{
  category: "string",
  brand: "Yamaha",
  name: "PAC Series",
  description: "Great for beginners.",
  price: 299.99,
  image: src = "https://media.sweetwater.com/api/i/q-70__h-300__w-300__f-png__b-original/images/items/1800/PAC612VIIFMIB-xlarge.jpg"
},
  
// ABOVE STRINGED INSTRUMENTS, BELOW PERCUSSION//
{
  category: "percussion",
  brand: "Meinl Percussion",
  name: "Tambourine",
  description: "A fine tambourine",
  price: 64.99,
  image: src = "https://media.sweetwater.com/api/i/b-original__w-215__h-215__bg-ffffff__q-85__f-webp__ha-9c567fd0b8f86f30__hmac-2bd634bc030757dc48169a40ea63a99b41ce6ca8/images/items/350/TAH2M-SNT.jpg.auto.webp"
},

{
category: "percussion",
brand: "Zildjian",
name: "Cymbal",
description: "An okay cymbal",
price: 389.99,
image: src = "https://media.sweetwater.com/api/i/b-original__w-215__h-215__bg-ffffff__q-85__f-webp__ha-1e92aa666a670a5d__hmac-0d7cd9bc3cd2ee662f358e6c273fa5f8e7f3b5b1/images/items/350/KC18DC.jpg.auto.webp"
},

{
category: "percussion",
brand: "Tama S.L.P",
name: "snare",
description: "An EPIC snare",
price: 299.99,
image: src = "https://media.sweetwater.com/api/i/q-70__h-300__w-300__f-png__b-original/images/items/1800/LST148-xlarge.jpg"
},

{
category: "percussion",
brand: "Treeworks",
name: "Triangle",
description: "A very cute triangle",
price: 25.99,
image: src = "https://media.sweetwater.com/api/i/b-original__w-215__h-215__bg-ffffff__q-85__f-webp__ha-70f93421c089e7bb__hmac-7565f3f9443b45a5b046c46659f302224ac7ac50/images/items/350/TRE-HS06.jpg.auto.webp"
},

{
category: "percussion",
brand: "Meinl Percussion",
name: "Cow Bell",
description: "Because you ALWAYS need more cow bell.",
price: 89.99,
image: src = "https://media.sweetwater.com/api/i/b-original__w-215__h-215__bg-ffffff__q-85__f-webp__ha-a4aae4e199a75c76__hmac-12cca3bf23bad71afd14179bcb3cd19b89cf9985/images/items/350/MJ-GB.jpg.auto.webp"
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
        fulfilled: true

        },
        {
          user_id: 7,
          fulfilled: true

          },
          {
            user_id: 7,
            fulfilled: false
          }

]


const order_products = [
  {
    product_id: 8,
    order_id: 1,
    quantity: 1 
  },

  {
    product_id: 3,
    order_id: 2,
    quantity: 3
  },

  {
    product_id: 9,
    order_id: 2,
    quantity: 1

  },

  {
    product_id: 7,
    order_id: 3,
    quantity: 4
    
  },

  {
   product_id: 11,
   order_id: 3,
   quantity: 1
  },

{
  product_id: 2,
  order_id: 4,
  quantity: 1
},

{
  product_id: 3,
  order_id: 4,
  quantity: 2
},

{
  product_id: 4, 
  order_id: 5,
  quantity: 2
},

{
  product_id: 5,
  order_id: 5,
  quantity: 3
},

{
  product_id: 6,
  order_id: 6,
  quantity: 2
},

{
  product_id: 9,
  order_id: 6,
  quantity: 1

}


]



const dropTables = async () => {
    try {
      await db.query (`
        DROP TABLE IF EXISTS order_products;
      `)
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
         
          await db.query(`
          CREATE TABLE order_products(
            product_id INTEGER REFERENCES products(id),
            order_id INTEGER REFERENCES orders(id),
            quantity INTEGER 
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

const insertOrderProducts = async () =>{
  try{
    for (const order_product of order_products) {
      await createOrderProduct(
        {
          product_id: order_product.product_id,
          order_id: order_product.order_id,
          quantity: order_product.quantity
        }
      )
    }
    console.log('data insertion win ')
  }catch(err)
  {
    console.log('No insertion, error', err)
  }
}

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
        await insertOrderProducts();
    }   
    catch (err) {
        throw err;
    }
    finally {
        db.end()
    }
}

seedDatabse()