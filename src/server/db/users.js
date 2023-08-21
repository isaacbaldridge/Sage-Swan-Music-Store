const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createUser = async({ name='first last', username, password, email, address, isAdmin }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [user ] } = await db.query(`
        INSERT INTO users(name, username, password, email, address, isAdmin)
        VALUES($1, $2, $3, $4, $5, $6)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`, [name, username, hashedPassword, email, address, isAdmin]);

        return user;
    } catch (err) {
        throw err;
    }
}

const getUser = async({email, password}) => {
    if(!email || !password) {
        return;
    }
    try {
        const user = await getUserByEmail(email);
        if(!user) return;
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if(!passwordsMatch) return;
        delete user.password;
        return user;
    } catch (err) {
        throw err;
    }
}

const getUserByEmail = async(email) => {
    try {
        const { rows: [ user ] } = await db.query(`
        SELECT * 
        FROM users
        WHERE email=$1;`, [ email ]);

        if(!user) {
            return;
        }
        return user;
    } catch (err) {
        throw err;
    }
}

async function getAllUsers() {
    try {
      const { rows } = await client.query(`
        SELECT id, name, username, address, isAdmin
        FROM users;
      `);
    console.log(rows);
      return rows;
    } catch (error) {
        console.log(error);
      throw error;
    }
  }

  async function getUserById(userId) {
    try {
      const { rows: [ user ] } = await client.query(`
        SELECT id, name, username, address, isAdmin
        FROM users
        WHERE id=${ userId }
      `);
  
      if (!user) {
        throw {
          name: "UserNotFoundError",
          message: "A user with that id does not exist"
        }
      }

    return user;
  } catch (error) {
    throw error;
  }
    }

module.exports = {
    createUser,
    getUser,
    getUserByEmail,
    getAllUsers,
    getUserById
};