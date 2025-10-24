const express = require('express');
const app = express();
require('dotenv').config();
const expressSession = require('express-session');
const flash = require('connect-flash');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
    secret: 'urbanpouchsecret',
    resave: false,
    saveUninitialized: false
}))

app.use(flash())
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

app.set('view engine', 'ejs');

const db = require('./config/mongooseConnection');

const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const index =require('./routes/index')

app.use('/',index);
app.use('/owners',ownersRouter);
app.use('/products',productsRouter);
app.use('/users',usersRouter);

app.listen(3000);