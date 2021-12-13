const jwt = require('jsonwebtoken');

const User = require('../models/User')

const validateJwt = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({message: "Did not find token"});
    }

}