const mongoose = require('../db/mongoose')

const Student = mongoose.model('student',{
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