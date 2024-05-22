const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/UserLoginSignup');
const productRouter = require('./routes/ProductRoute');
const adminRouter = require('./routes/AdminLogin');
const { handleConnectMongoDb } = require('./connection');
const cookieParser = require('cookie-parser');
const globalRouter = require('./routes/GlobalRouter');
const CartRouter = require('./routes/CartRouter');
const app = express();

// ENV file
require("dotenv").config()
const port =  process.env.PORT
const uri =  process.env.URI

// middleware
const corsOptions = {
  // origin:"http://localhost:5173",
  origin:"https://shopezy-mern-frontend.vercel.app",
  credentials:true,
  
}
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors(corsOptions));

// routes
app.use(userRouter);
app.use(productRouter);
app.use(adminRouter);
app.use(globalRouter)
app.use(CartRouter);


// Db connection
handleConnectMongoDb(uri);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });