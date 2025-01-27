const express = require('express');
const router = express.Router()
const ownerModel = require('../models/owner-model');
const { generateToken } = require('../utils/generateToken');

router.get('/', function (req, res) {
    res.send("ownersRouter working");
});

// if(process.env.NODE_ENV === "development"){
router.post('/create', async function (req, res) {
    let { fullname, email, password } = req.body;
    let owner = await ownerModel.find({});
    if (owner.length > 0) {
        return res.status(503).send("You do not have permission to create new owner");
    }
    let createdOwner = await ownerModel.create({
        fullname,
        email,
        password
    })
    res.status(201).send(createdOwner);
});
// }

// console.log("process.env.NODE_ENV: ",process.env.NODE_ENV);

router.post('/admin', async function (req, res) {
    // let { email, password } = req.body;
    // let success = req.flash("success") || [];

    // let owner = await ownerModel.findOne({ email: email });
    // if (!owner) return res.send("Email or password  incorrect");

    // console.log(success)
    res.render("createproducts");
})

router.get('/add', function (req, res) {
    res.render("createproducts");
})

module.exports = router