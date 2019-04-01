const express          =   require('express');
const app              =   express();
const bodyParser       =   require('body-parser');
const session          =   require('express-session');
const morgan           =   require('morgan');
const methodOverride   =   require('method-override');

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
    saveUninitialized  :   false,
    store              :   store
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('short'));
app.use(methodOverride('_method'));
app.use(express.static('public'));

const authsController   =  require('./controllers/authsController');
const brandsController  =  require('./controllers/brandsController');
const dealsController   =  require('./controllers/dealsController');
const usersController   =  require('./controllers/usersController');

app.use('/auths', authsController);
app.use('/brands', brandsController);
app.use('/deals', dealsController);
app.use('/users', usersController);
app.use(session({
    message:''
}));

app.use('/users/:id/brands', (req, res, next) => {
    req.userId = req.params.id;
    next();
}, brandsController);
// app.use('/brands/:id/deals', (req, res, next) => {
//     req.brandId = req.param.id;
//     next();
// }, dealsController);

app.get('/', (req, res) => {
    res.render('index.ejs', {
        message: req.session.message
    });
});

app.listen(process.env.PORT, () => {
    console.log('Server Is Runing!');
});


