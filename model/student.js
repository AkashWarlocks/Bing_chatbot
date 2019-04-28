const mongoose = require('../db/mongoose')

const studentSchema = new mongoose.Schema({
    StudentName:{
        type:String
    },
    Contact:{
        type:String
    },
    Email:{
        type:String
    },
    BNo:{
        type:String
    },
    Year:{
        type:String
    }

})

const Student = mongoose.model('students',studentSchema)
module.exports = Student