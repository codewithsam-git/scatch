const express = require('express');
const router = express.Router()
const productModel = require('../models/product-model');
const upload = require('../config/multer-config');

router.get('/', function (req, res) {
    res.send("productsRouter working");
})


router.post('/create', upload.single("image"), async function (req, res) {
    try {
        console.log(req.body);
        let {name, price, discount, bgcolor, panelcolor, textcolor} = req.body
        let product = await productModel.create({
            name, 
            price, 
            discount, 
            bgcolor, 
            panelcolor, 
            textcolor, 
            image: req.file.buffer 
        });
        // req.flash("success", "Product created successfully.");
        // res.redirect('/owners/admin');
        res.render('createproducts');

    } catch (error) {
        console.log("products/create: ", error)
    }
})

module.exports = router