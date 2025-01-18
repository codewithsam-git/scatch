const express = require('express');
const db = require('./config/mongoose-connection')
const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');

require('dotenv').config();  // helps to use value from .env to another files
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser()) // use to read cookies on another routes

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000, function(req, res){
    console.log("Running");
})