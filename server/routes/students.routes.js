const Student = require("../models/Student.model")
const { default: mongoose } = require("mongoose")
const router = require("express").Router()


router.get("/", async (req, res, next) => {
    try {
        const students = await Student.find()
        res.status(200).json(students)
    } catch (error) {
        next(error)
    }
})

router.get("/:studentId", async (req, res, next) => {
    const { studentId } = req.params;
    if (!mongoose.isValidObjectId(studentId)) {
        throw new Error("Invalid Id")
    }
    try {
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.status(200).json(student)
    }
    catch (error) {
        next(error)
    }
})

router.post("/", async (req, res, next) => {
    console.log(req.body)
    try {
        const newStudent = await Student.create(req.body)
        res.status(201).json(newStudent)
    } catch (error) {
        console.log("Error:", error)
        next()
    }
})

router.put("/:studentId", async (req, res, next) => {
    const { studentId } = req.params
    if (!mongoose.isValidObjectId(studentId)) {
        throw new Error("Invalid Id")
    }
    try {
        const updatedStudent = await Student.findByIdAndUpdate(studentId,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedStudent) {
            return next(new Error("Student not found"))
        }

        res.status(200).json(updatedStudent)
    }
    catch (error) {
        next(error)
    }
})


router.delete("/:studentId", async (req, res, next) => {
    const { studentId } = req.params;

    try {
        if (!mongoose.isValidObjectId(studentId)) {
            throw new Error("Invalid studentId");
        }

        const deletedStudent = await Student.findByIdAndDelete(studentId);

        if (!deletedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router