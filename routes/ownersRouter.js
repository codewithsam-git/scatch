const express = require('express');
const router = express.Router()
const ownerModel = require('../models/owner-model');
const { generateToken } = require('../utils/generateToken');
const productModel = require('../models/product-model');

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
});

router.get('/account', async function (req, res) {
    let products = await productModel.find();
    res.render("account", { products });
});

router.get('/delete/:id', async function (req, res) {
    let user = await productModel.deleteOne({ _id: req.params.id });
    console.log("Deleted User: ", user);
    res.redirect('/owners/account')
});

router.get('/edit/:id', async function (req, res) {
    let product = await productModel.findOne({ _id: req.params.id });
    res.render("edit", { product });
});

module.exports = router