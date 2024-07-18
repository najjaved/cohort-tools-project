const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const { isAuthenticated } = require('../middleware/route-guard.middleware')
require("dotenv").config()
const router = require('express').Router()
// All routes starts with /auth
router.get('/', (req, res) => {
    res.json('All good in auth')
})

// POST Signup
router.post('/signup', async (req, res, next) => {
    const salt = bcrypt.genSaltSync(13)
    const passwordHash = bcrypt.hashSync(req.body.password, salt)
    try {
        const newUser = await User.create({ ...req.body, passwordHash })
        res.status(201).json(newUser)
    } catch (error) {
        if (error.code === 11000) {
            console.log("duplicate")
        }
        next(error)
    }
})
// POST Login

router.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    // try to get the user
    // Check the password

    try {
        const potentialUser = await User.findOne({ username })

        // User does exist with this username
        if (potentialUser) {
            // User has correct credentials
            if (bcrypt.compareSync(password, potentialUser.passwordHash)) {
                const token = jwt.sign({ userId: potentialUser._id }, process.env.TOKEN_SECRET)
                res.json({ token })
            } else {
                res.status(403).json({ message: "Incorrect password" })
            }
        } else {
            res.status(404).json({ message: "Username or password is not correct" })
        }
    } catch (error) {
        next(error)
    }
})

// GET Verify

router.get("/verify", isAuthenticated, (req, res, next) => {
    res.status(200).json(req.payload);
})

module.exports = router
