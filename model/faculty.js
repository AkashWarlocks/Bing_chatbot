const mongoose = require('mongoose')

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

const Faculty = mongoose.model('Faculty',facultySchema)

module.exports = Faculty