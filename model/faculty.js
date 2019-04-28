const mongoose = require('../db/mongoose')

const facultySchema = new mongoose.Schema({
 facultyName:{
     type:String
 },
 facultyContact:{
     type:String
 },
 facultyID:{
     type:String
 },
 facultyEmail:{
     type:String
 },
 facultyCourse:{
     type:String
 },
 officeHours:{
     type:String
 }  
})

const Faculty = mongoose.model('faculty',facultySchema)

module.exports = Faculty