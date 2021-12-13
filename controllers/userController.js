const bcrypt = require('bcrypt');
const { generateJwt } = require('../helpers/processJwt');
const tokenString = "jwtawhere"

const User = require('../models/User');
const router = require('../routes/auth');

const getAllUsers = async (req, res) => {
    const users = await User.find();

    try {
        if (users.length === 0) {
        return res.status(400).json({message: "Did not find any users"});
        }
        return res.status(200).json(users);
    }   catch (error) {
        return res.status(500).json({message: "Could not get users"})
    }
};

const getSingleUser = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);
    try {
        return res.status(200).json(user);
    }   catch (error) {
        return res.status(500).json({message: "Could not get single user"})
    }
;}

const updateUser = async (req, res) => {
    const {id} = req.params;
    const userToUpdate = await User.findByIdAndUpdate(id, req.body, {new: true});
    try {
        return res.status(202).json(userToUpdate)   
    }   catch (error) {
        return res.status(500).json({message: "Could not update the user"});
    }
}

const deleteUser = async (req, res) => {
    const {id} = req.params;
    await User.findByIdAndDelete(id);
    try {
        return res.status(203).json({message: "User successfully deleted"});
    }   catch (error) {
        return res.status(500).json({message: "Could not delete user"})
    }
}


const signupUser = async (req, res) => {
    const { email, password } = req.body;
    const testEmail = await User.findOne({email})
    if (testEmail) return res.status(500).json({message: "Could not create user existing email"});;

    const user = new User(req.body)

    console.log( "before try")
    try {
    console.log( "inside try");
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt);
    user.save();
    console.log("after user save")
    const token = await generateJwt(user._id)
    console.log("after token generated")
    return res.status(201).json({user, token});
}   catch (error) {
    return res.status(500).json({message: "Could not create the user wrong process"})
}
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    console.log("finding one", email)
    if (!user) {
        return res.status(500).json({message: "Please check credentials"})
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
        return res.status(500).json({message: "Please check credentials"});
    }
    const token = await generateJwt(user._id);
    console.log(user._id)
    try {
        return res.status(200).json({user, token})
    } catch (error) {
        return res.status(500).json({message: error})
    }
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

// Authenticated
const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem(tokenString)) {
        return JSON.parse(localStorage.getItem(tokenString))
    }
    return false
}

const logoutUser = () => {
    localStorage.removeItem(tokenString);
    window.location.reload();
}

module.exports = {
    signupUser,
    loginUser,
    googleLoginUser, 
    logoutUser, 
    isAuthenticated,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}