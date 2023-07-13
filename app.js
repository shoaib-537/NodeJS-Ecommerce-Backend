const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoute.js')
const addressRouter = require('./routes/addressRoute.js')
const productRouter = require('./routes/productRoute.js')
const wishlistRouter = require('./routes/wishlistRoute.js')
const users = require('./routes/users.js')


// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

const app = express();


const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://ezibackenddb:lf238jnk2389bcv@cluster0.sap1ehr.mongodb.net/');
        console.log("Connected to mongoDB!");
    } catch (error) {
        console.log(error);
    }
};



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/address', addressRouter);
app.use('/api/shop', productRouter);
app.use('/api/user', wishlistRouter);
// app.use('/api/user', users);




app.listen(8800, () => {
    connect();
    console.log("Backend server running");
})


module.exports = app;
