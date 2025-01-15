const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser()) // use to read cookies on another routes


app.get('/', function(req, res){
    res.send("hello");
})

app.listen(3000, function(req, res){
    console.log("Running");
})