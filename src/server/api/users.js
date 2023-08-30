const express = require('express')
const usersRouter = express.Router();

const {
    createUser,
    getUser,
    getAllUsers,
    getUserByEmail,
    getUserById
} = require('../db');

const jwt = require('jsonwebtoken')

usersRouter.get('/', async( req, res, next) => {
    try {
        console.log("In user route:");
        const users = await getAllUsers();

        res.send(users);
    } catch ({name, message}) {
        next({name, message})
    }
});

usersRouter.post('/login', async(req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both an email and password'
        });
    }
    try {
        const user = await getUser({email, password});
        if(user) {
            const token = jwt.sign({
                id: user.id,
                email
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });

            res.send({
                message: 'Login successful!',
                token
            });
        }
        else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            });
        }
    } catch(err) {
        next(err);
    }
});

usersRouter.post('/register', async(req, res, next) => {
    const { name, username, password, email, address, isAdmin = false } = req.body;
    
    try {
        const _user = await getUserByEmail(email);

        if(_user) {
            next({
                name: 'UserExistsError',
                message: 'A user with that email already exists'
            });
        }
console.log(password)
        const user = await createUser({
            name,
            username,
            password,
            email,
            address,
            isAdmin
            
        });

        const token = jwt.sign({
            id: user.id,
            email
        }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });

        res.send({
            message: 'Sign up successful!',
            token
        });
    } catch({name, message}) {
        next({name, message})
    }
})

//Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJlbWlseUBleGFtcGxlLmNvbSIsImlhdCI6MTY5MjcxNjg3MiwiZXhwIjoxNjkzMzIxNjcyfQ.crp25gQ8IJGvbmqz4js5ug1-wKbe7CDaADwXJMH76zM

usersRouter.get('/:id', async (req, res, next) => {
    try {
      res.send(req.user);
    } catch (error) {
      next(error)
    }
  })

/* usersRouter.get('/:id', async (req, res) => {


    try {
      if (!token) {
        return res.status(400).send('bad token')
      }
  
      res.status(200).send({ message: 'You are all good.', ...user })
    } catch (err) {
      res.status(500).send({ message: 'Server error with JWT token.' })
    }
  })
 */
module.exports = usersRouter;