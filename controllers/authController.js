const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.register = async (req, res) => {
    try {

        const hash = await bcrypt.hash(req.body.password, 5)
        const newUser = new User({
            ...req.body,
            password: hash,
        })
        await newUser.save()
        res.status(201).send("User created")
    } catch (err) {
        res.status(500).send("Something went wrong")
    }
}

module.exports.login = async (req, res, next) => {
    try {
        // const { name, password } = req.body
        const user = await User.findOne({ name: req.body.name }).select('-address')
        if (!user) return res.status(404).send("Invalid username or password");
        const isCorrect = bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) return res.status(400).send("Invalid username or password");

        const token = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, 'dafedf4a451565e7634efc27eeba4f90')


        const { password, ...info } = user._doc;
        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).send(user);
    } catch (err) {
        next(err)
    }
}
module.exports.logout = (req, res) => {
    res.clearCookie('accessToken', {
        SameSite: "none",
        secure: true
    }).status(200).send("User has logged out")
}

