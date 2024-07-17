const Student = require("../models/Student.model")
const router = require("express").Router()

const { 
    httpGetAll, 
    httpGetOne,
    httpPost,
    httpPut,
    httpDelete
 } = require("../helpers/httpMethods")

router.get("/", (req, res, next) => {
    httpGetAll(Student, res, next, "student");
})

router.get("/:studentId", (req, res, next) => {
    const { studentId } = req.params;
    httpGetOne(Student, res, next, studentId, "student");
})

router.post("/", (req, res, next) => {
    httpPost(Student, req, res, next);
})

router.put("/:studentId", (req, res, next) => {
    const { studentId } = req.params;
    httpPut(Student, req, res, next, studentId, "student");
})

router.delete("/:studentId", async (req, res, next) => {
    const { studentId } = req.params;
    httpDelete(Student, res, next, studentId, "student");
})

module.exports = router