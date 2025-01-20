const jwt = require('jsonwebtoken');

const generateToken = (user) =>{
    // console.log("useruser",user);
    return jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY)
}
module.exports.generateToken = generateToken;