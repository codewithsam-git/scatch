const jwt = require("jsonwebtoken");
const userModel = require('../models/user-model');

module.exports = async function(req, res, next){
    if(!req.cookies.token){
        req.flash("error", "You need to login");
        return res.redirect("/");
    }

    try {
        let decode = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel.findOne({email: decode.email}).select("-password")
        res.user = user;
        next();
    } catch (err) {
        req.flash("error", "Something went wrong");
        res.redirect("/");
    }
}