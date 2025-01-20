const express = require('express');
const router = express.Router()
const ownerModel = require('../models/owner-model');

router.get('/', function(req, res){
    res.send("ownersRouter working");
});

// if(process.env.NODE_ENV === "development"){
    router.post('/create', async function(req, res){        
        let {fullname, email, password} = req.body;
        let owner = await ownerModel.find({});
        if(owner.length > 0) {
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

router.get('/admin', function(req, res){
    let success = req.flash("success");
    console.log(success)
    res.render("createproducts", {success})
})

module.exports = router