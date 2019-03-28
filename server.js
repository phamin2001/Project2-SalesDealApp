const express      =   require('express');
const app          =   express();
const bodyParser   =   require('body-parser');
const cors         =   require('cors');
const session      =   require('express-session');
const morgan       =   require('morgan');

require('dotenv').config();
require('./db/db');

const MongoDBStore  = require('connect-mongodb-session')(session);
const store         = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'mySessions'
});

store.on('error', function(error) {
    console.log(error);
});

app.use(session({
    secret             :   'this is a random string',
    resave             :   false, 
    saveUninitialized  :   false
}));

