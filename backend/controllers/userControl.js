const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/usersModel")
/* Create and register user */
const userRegister = async (req, res) => {
    try {
        const { userName, email, password } = req.body
        const existsUser = await User.findOne({ email })
        if (existsUser) {
            return res.status(400).json({ message: "You are already exists user, please login" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            userName,
            email,
            password: hashedPassword
        })
        return res.status(200).json({ message: "Register successful", user })
    } catch (error) {
        console.error(error)
    }
}
/* Get all users */
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({ message: "get all users successfully", users })
    } catch (error) {
        console.error(error)
    }
}
/* user Login */
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" })
        }
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET_KEY, { expiresIn: "1hr" })
        return res.status(200).json({message: "Login successful",user, token})
    } catch (error) {
        console.error(error)
    }
}
module.exports = {
    userRegister,
    getUsers,
    userLogin
}