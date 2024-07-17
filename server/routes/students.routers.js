/* const Student = require("../models/Student.model")


router.get("/", async (req, res, next) => {
   try {
       const singleStudent = await Student.find()
       res.status(200).json(singleStudent)
   } catch (error) {
       console.log("Error:", error)
       res.status(500)
   }
})

router.get("/:studentId", (req, res) => {
   res.json(`Here is my ${req.params.studentId}`)
})

router.post("/", async (req, res) => {
   try {
       const newStudent = await Student.create(req.body)
       res.status(201).json(newStudent)
   } catch (error) {
       console.log("Error:", error)
       res.status(500)
   }
})

router.put("/:studentId", (req, res, next) ={
   try {
       
   } catch (error) {
       next(error)
   }
})

*/