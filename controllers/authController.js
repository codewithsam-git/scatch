const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = async function (req, res) {
    try {
        let { fullname, email, password } = req.body;

        let user = await userModel.findOne({email});
        if(user) return res.status(401).send("You already have account, please login.")

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message)
                else {
                    let user = await userModel.create({
                        fullname,
                        email,
                        password: hash
                    });
                    let token = generateToken(user);
                    res.cookie("token", token);
                    // console.log(req.cookies.token);
                    // res.send("User created successfully.");
                    res.redirect('/');
                }
            })
        })
    } catch (err) {
        res.send("Register Route: ", err.message);
    }
}

module.exports.loginUser = async function(req, res){
    let { email, password } = req.body;
    let user = await userModel.findOne({email: email});
    if(!user) return res.send("Email or password  incorrect");

    bcrypt.compare(password, user.password, function(err, result){
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);             
            res.redirect('/shop');
        }
        else{
            res.send("Email or password  incorrect");
        }
    });
}