const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

//#1 cookies
const session = require('express-session')
// set parameters of cookies
const KnexSessionStorage = require("connect-session-knex")(session)
//bring in database so knexSessionsStorage can connect to db
const knexConnection = require('../database/dbConfig')

//#2 Cookies: configure sessions and cookies
const sessionConfiguration = {
    name: 'Boom',
    //need to encrypt, and decrypt to read
    secret: process.env.COOKIE_SECRET || 'is it the legion of secret key',
    cookie: {
      maxAge: 1000 *60 * 60, //valid for 1 hour
      secure: process.env.NODE_ENV === 'development' ? false : true, //do we send cookies over https? deve false, anywhere else true
      httpOnly: true, //prevent client js.code access to cookie, set to true in development
    },
    resave: false, //forces the session to be saved back to the session store, even if the session was never modified during the request.
    saveUninitialized: true, //false is useful for implementing login sessions,
    //reducing server storage usage, or complying with laws that require permission before setting a cookie.
    store: new KnexSessionStorage({ //changes how sessions are stored
      knex: knexConnection, //connect to db, sqlite3, heroku, postgresql, save session cookie info
      clearInterval: 1000 * 60 * 10, // delete expired sessions every 10 minutes
      tablename: "user_sessions", //name of table
      sidfieldname: "id", //name of key
      createtable: true //if table does not exsist, create table
    })
  }

module.exports= server => {
server.use(helmet());
server.use(cors());
server.use(express.json());
// #3 Cookie: added to create session db, npm i express-session
server.use(session(sessionConfiguration))
}