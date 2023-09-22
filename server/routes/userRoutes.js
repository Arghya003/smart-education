const express = require('express')
const router = express.Router();
const {auth} = require("../middlewares/auth")
const { registerUser, loginUser,logOut, getAllUsers} = require('../controllers/userControllers');

router.route('/register').post( registerUser);
router.post('/login', loginUser);
router.get('/logout', auth, logOut)
router.get('/users', getAllUsers);

module.exports = router;