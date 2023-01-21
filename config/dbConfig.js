const dotenv = require("dotenv").config();
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const dbName = process.env.DB_NAME;
const dbUrl =
  "mongodb+srv://Raja_AMD:RAJAamd123@cluster0.rhksdpw.mongodb.net/Student_Mentor";
module.exports = { mongodb, mongoose, dbName, dbUrl };
