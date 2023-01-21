const mongoose = require("mongoose");
const validator = require("validator");
const StudentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    student_id: { type: String, required: true },
    class: { type: String, required: true },
    age: { type: Number, required: true },
    mentor: { type: String, default: "" },
    createdAt: { type: String, default: new Date() },
  },
  { collection: "Student", versionKey: false }
);
const StudentModel = mongoose.model("Student", StudentSchema);
module.exports = { StudentModel };
