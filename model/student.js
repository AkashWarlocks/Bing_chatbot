const mongoose = require('mongoose')


const Student = mongoose.model('students',{
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
 module.exports = Student