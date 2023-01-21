var express = require("express");
var router = express.Router();
const { dbUrl } = require("../config/dbConfig");
const { StudentModel } = require("../Schema/StudentSchema");
const { mongoose } = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(dbUrl);

/* GET users listing. */
router.get("/", async (req, res) => {
  let student = await StudentModel.find();
  res.send({ status: 200, message: "Student lists", student });
});
router.get("/studentofmentor", async (req, res) => {
  let studentOfMentor = await StudentModel.find({
    student_id: req.body.students.map((e) => e),
  });
  res.send({ status: 200, message: "Student lists", studentOfMentor });
});
router.post("/studentcreate", async (req, res) => {
  try {
    let studentExist = await StudentModel.findOne({
      student_id: req.body.student_id,
    });
    if (!studentExist) {
      let newStudent = await StudentModel.create(req.body);
      res.send({ status: 200, message: "Student Added Successfully" });
    } else {
      res.send({ status: 400, message: "Student already Exist with same id" });
    }
  } catch (err) {
    console.log(err);
    res.send({ statusCode: 500, message: "Internal server error" });
  }
});
module.exports = router;
