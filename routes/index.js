const express = require('express');
const router = express.Router()
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models//product-model');
const userModel = require('../models/user-model');

router.get("/", function (req, res) {
    let error = req.flash("error");
    res.render("index", { error, loggedin: false })
});

router.get('/shop', isLoggedIn, async function (req, res) {
    let products = await productModel.find();
    let success = req.flash("success");
    // res.send({"responseMessage": "Data fetched successfully!", data: products});
    res.render("shop", { products, success });
});

router.get('/cart', isLoggedIn, async function (req, res) {
    let  user = await userModel.findOne({email: req.user.email}).populate('cart');
    // console.log(user);
    res.render("cart", {user});
});

router.get('/addtocart/:id', isLoggedIn, async function (req, res) {
    console.log(req.user);
    let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.id);
    await user.save();
    req.flash("success", "Added to cart successfully.");
    res.redirect('/shop');
});

router.get("/logout", function (req, res) {
    // res.send("logout - profile a page here")
    res.redirect("/")
})

module.exports = router;