const mongoose = require("mongoose");
const validator = require("validator");

const MentorSchema = new mongoose.Schema(
  {
    fname: { type: String, required: true },
    mentor_id: { type: String, required: true },
    subject: { type: String, required: true },
    students: [{ type: String }],
    role: { type: String, default: "mentor" },
    createdAt: { type: String, default: new Date() },
  },
  { collection: "Mentor", versionKey: false }
);
const MentorModel = mongoose.model("Mentor", MentorSchema);
module.exports = { MentorModel };
