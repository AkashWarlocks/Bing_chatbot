const mongoose = require('../db/mongoose')

const raisedIssueSchema = new mongoose.Schema({
    issueType:{
        type:String
    },
    Description:{
        type:String
    },
    raisedBy:{
        type:String
    },
})

const ra_issued = mongoose.model('raised_issues',raisedIssueSchema)

module.exports = ra_issued

