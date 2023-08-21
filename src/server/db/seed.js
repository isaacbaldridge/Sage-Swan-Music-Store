const db = require('./client');
const { createUser } = require('./users');

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

const dropTables = async () => {
    try {
        await db.query(`
        DROP TABLE IF EXISTS users;
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

const seedDatabse = async () => {
    try {
        db.connect();
        await dropTables();
        await createTables();
        await insertUsers();
    }
    catch (err) {
        throw err;
    }
    finally {
        db.end()
    }
}

seedDatabse()