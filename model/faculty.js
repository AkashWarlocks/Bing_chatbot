const mongoose = require('../db/mongoose')

const facultySchema = new mongoose.Schema({
    facultyName:{
        type:String
    },
    facultyContact:{
        type:String
    },
    facultyEmail:{
        type:String,    
    },
    facultyID:{
        type:String
    },
    facultyCourses:{
        type:String
    },
    officeHours:{
        type:String
    },
    taCode:{
        type:String
    }

})

const Faculty = mongoose.model('faculties',facultySchema)

module.exports = Faculty