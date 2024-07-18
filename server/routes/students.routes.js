const Student = require("../models/Student.model")
const router = require("express").Router()

const {
    httpGetAll,
    httpGetOne,
    httpPost,
    httpPut,
    httpDelete
} = require("../helpers/httpMethods");
const { isAuthenticated } = require("../middleware/route-guard.middleware");

router.get("/", (req, res, next) => {
    httpGetAll(Student, res, next, "student");
})

router.get("/:studentId", (req, res, next) => {
    const { studentId } = req.params;
    httpGetOne(Student, res, next, studentId, "student");
})

router.post("/", isAuthenticated, (req, res, next) => {
    httpPost(Student, req, res, next);
})

router.put("/:studentId", isAuthenticated, (req, res, next) => {
    const { studentId } = req.params;
    httpPut(Student, req, res, next, studentId, "student");
})

router.delete("/:studentId", isAuthenticated, (req, res, next) => {
    const { studentId } = req.params;
    httpDelete(Student, res, next, studentId, "student");
})

module.exports = router