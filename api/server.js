const express = require('express')
const server = express();

const authenticate = require('../auth/authenticate');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');



const configureMiddleware = require('./api-middleware')
configureMiddleware(server)

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.use('/', (req, res) => {
    {res.status(200).json('Its Alive')}
})

module.exports = server;
