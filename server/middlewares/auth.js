const jwt = require("jsonwebtoken");
const User = require('../config/models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        
        if (token) {
            const verifyUser = jwt.verify(token, process.env.JWT_TOKEN);
            const rootUser = await User.findOne({ _id: verifyUser._id });
            req.user_id = rootUser._id;
            req.rootUser = rootUser;
            req.token = token;
            next();
        } else {
            res.status(422).json({ msg: "JWT not verified" });
        }


    } catch (err) {
        res.status(422).json({ msg: "JWT not verified" });
    }
};

module.exports = {auth};