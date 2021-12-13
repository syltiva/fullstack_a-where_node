const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { validateFields } = require('../helpers/validateFields')
// const { validateJwt } = require('../helpers/processJwt');
const {  
    signupUser, 
    loginUser, 
    googleLoginUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
 } = require('../controllers/userController');

router.get("/users", getAllUsers)

router.get("/users/user/:id", getSingleUser);

router.post("/signup", [
    check("name", "A name is required to sign up").not().isEmpty(),
    check("email", "An email is required to sign up").isEmail(),
    check(
        "password", 
        "Password must be a minimum of 8 characters and include a capital letter and symbol")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,"i"),
    validateFields
], signupUser)
console.log("password checked")


router.post("/login", [
    check("email", "An email is required to log in").isEmail(),
    check("password", "A password is required to log in").not().isEmpty(),
    validateFields
], loginUser);

router.put("/users/user/:id", updateUser);

router.delete("/users/user/:id", deleteUser)

router.post("/googleLogin", googleLoginUser);

module.exports = router;