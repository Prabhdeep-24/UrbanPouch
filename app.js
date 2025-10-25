const express = require('express');
const app = express();
require('dotenv').config();
const expressSession = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


app.use(cookieParser());
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

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

const db = require('./config/mongooseConnection');

const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const cartRouter = require('./routes/cartRouter');
const index =require('./routes/index')
const userModel = require('./models/user-model');
const {createUser} = require('./controllers/AuthControllers');

async function createOwner(){
    const user = await userModel.findOne({isAdmin: true});
    if(user){
      return;
    }
  
    await createUser('owner','owner@gmail.com','IamOwner',true);  
}

createOwner();
app.use('/',index);
app.use('/owners',ownersRouter);
app.use('/products',productsRouter);
app.use('/users',usersRouter);
app.use('/cart',cartRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running`);
});
