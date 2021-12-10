const User = require('../models/User')
const bcrypt = require('bcrypt');
const { generateJwt } = ('../helpers/processJwt.js')

const signupUser = async (req, res) => {
    const { email, password } = req.body;
    const testEmail = await User.findOne({email})
    if (testEmail) return res.status(500).json({message: "Could not create user"});;

    const user = new User(req.body)
    try {
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)
    user.save()
    const token = await generateJwt(user._id)
    return res.status(201).json({user, token});
}   catch (error) {
    return res.status(500).json({message: "Could not create the user"})
}
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if (!user) {
        return res.status(500).json({message: "Please check credentials"})
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
        return res.status(500).json({message: "Please check credentials"});
    }
    const token = await generateJwt(user._id);
    return res.status(200).json(user, token)
}

const googleLoginUser = async (req, res) => {
    const {email, name} = req.body
    let user = await User.findOne({email})
    if (!user) {
        user = await User.create({
            email: email,
            name: name, 
            password: "P", 
            google: true
        })
    }
    try {
        const token = await generateJwt(user._id)
        return res.status(200).json(user, token)
    }   catch (error) {
        return res.status(500).json({message: "User not able to log in"})
    }
;}

module.exports = {
    signupUser,
    loginUser,
    googleLoginUser
}