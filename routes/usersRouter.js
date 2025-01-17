const express = require('express');
const router = express.Router()
const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', function (req, res) {
    res.send("usersRouter working");
});

router.post('/register', function (req, res) {
    try {
        let { fullname, email, password } = req.body;
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message)
                else {
                    let user = await userModel.create({
                        fullname,
                        email,
                        password: hash
                    });
                    let token = jwt.sign({ email, userId: user._id }, "secret")
                    res.cookie("token", token);
                    // console.log(req.cookies.token);
                    res.send("User created successfully.");
                }
            })
        })
    } catch (err) {
        res.send("Register Route: ", err.message);
    }
})

module.exports = router