const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String
    },
    courseID:{
        type:String
    },
    examDate:{
        type:String
    }
})

const Course = mongoose.model('Course', courseSchema)

module.export = Course