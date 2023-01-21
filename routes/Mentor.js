var express = require("express");
var router = express.Router();
const { dbUrl } = require("../config/dbConfig");
const { MentorModel } = require("../Schema/MentorSchema");
const { StudentModel } = require("../Schema/StudentSchema");
const { mongoose } = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(dbUrl);
/* GET users listing. */
router.get("/", async (req, res) => {
  let mentors = await MentorModel.find();
  res.send({ status: 200, message: "Mentor lsits", mentors });
});

router.post("/mentorcreate", async (req, res) => {
  try {
    let mentorExist = await MentorModel.findOne({
      mentor_id: req.body.mentor_id,
    });
    if (!mentorExist) {
      let newMentor = await MentorModel.create(req.body);
      res.send({ status: 200, message: "Mentor Added Successfully" });
    } else {
      res.send({ status: 400, message: "Mentor already Exist with same id" });
    }
  } catch (err) {
    console.log(err);
    res.send({ statusCode: 500, message: "Internal server error" });
  }
});
router.post("/asignstudent", async (req, res) => {
  try {
    let mentorExist = await MentorModel.findOne({
      mentor_id: req.body.mentor_id,
    });
    console.log(mentorExist._id);
    if (mentorExist) {
      let newMentor = await MentorModel.findByIdAndUpdate(
        {
          _id: mentorExist._id,
        },
        {
          students: req.body.students,
        }
      );
      let update = await StudentModel.updateMany(
        {
          student_id: req.body.students.map((e) => e),
        },
        {
          mentor: mentorExist.fname,
        }
      );
      //   });
      res.send({
        status: 200,
        message: `Students assigned to ${mentorExist.fname}`,
      });
    } else {
      res.send({ status: 400, message: "Mentor doesn't exist" });
    }
  } catch (err) {
    console.log(err);
    res.send({ statusCode: 500, message: "Internal server error" });
  }
});
module.exports = router;
