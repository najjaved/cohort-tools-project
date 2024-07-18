const { httpGetOne } = require("../helpers/httpMethods")
const { isAuthenticated } = require("../middleware/route-guard.middleware")
const User = require("../models/User.model")
const router = require("express").Router()

router.get("/users/:userId", isAuthenticated, (req, res, next) => {
    const { userId } = req.params;
    httpGetOne(User, res, next, userId, "user");
})

module.exports = router