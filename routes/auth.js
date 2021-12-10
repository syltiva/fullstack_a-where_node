const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { signupUser, loginUser, googleLoginUser } = require('../controllers/userController');
const { validateFields } = require('../helpers/validateFields')

router.post("signup", [
    check("name", "A name is required to sign up").not().isEmpty(),
    check("email", "An email is required to sign up").isEmail(),
    check("password", "Password must be a minimum of 8 characters and include a capital letter and symbol")
        .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,"i"),
    validateFields
], signupUser)

router.post("login", [
    check("email", "An email is required to log in").isEmail(),
    check("password", "A password is required to log in").not().isEmpty(),
    validateFields
], loginUser);


router.post("/googleLogin", googleLoginUser);

module.exports = router;