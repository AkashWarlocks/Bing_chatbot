require('../db/mongoose')
const Student = require('../model/student')
let facultyHandler = require('../handlers/facultyHandler')
const Faculty = require('../model/faculty')
let courseHandler = require('../handlers/courseHandler')
let libraryHandler = require('../handlers/libraryHandler')
let issueHandler = require('../handlers/issueHandler')
let mainMenuHandler = require('../handlers/mainMenuHandler')

//const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://user:mruaka123@cluster0-3awwl.mongodb.net/admin?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("bing_bot").collection("student");
//   // perform actions on the collection object
//   collection.find().then((d)=>{
//     data = d;
//   })
//   client.close();
// });

const bodyparser = require('body-parser');
const express = require('express')
router = express()

router.use(
    bodyparser.urlencoded({
        extended: false
    })
);
router.use(
    bodyparser.json()
);
router.post('/Bing_bot',async (req,res)=>{
   // console.log(JSON.stringify(req.body));
    const _id = "5cc29f0ffb6fc0265f298890"
    if(req.body.result.metadata.intentName === 'Students'){
      
     await Student.findById(_id).then((data)=>{
        console.log('data: ', data)
        return res.json({
          speech: "Can I know your good name please ?",
              displayText: "Can I know your name ?",
              source:"google"
      })

    }).catch((e)=>{
        console.log('error: ',e)
        return res.json({
          speech: "Can I know your good name please ?",
          displayText: "Can I know your name ?",
          source:"google"  
        })

    })
  }
  else if(req.body.result.metadata.intentName === 'showFaculty'){
    facultyHandler.showFaculty(req,res)
  } 
  else if(req.body.result.metadata.intentName === 'showFaculty_followUp'){
    facultyHandler.showFaculty_single(req,res)
  }else if(req.body.result.metadata.intentName === 'showCourses'){
    courseHandler.showCourses(req,res)
  } else if(req.body.result.metadata.intentName === 'showCourses_followUp'){
    courseHandler.singleCourse(req,res)
  } else if(req.body.result.metadata.intentName === 'libraryTimings'){
    libraryHandler.libraryTimings(req,res)
  } else if(req.body.result.metadata.intentName === 'raiseIssue'){
    issueHandler.raiseIssue(req,res)
  } else if(req.body.result.metadata.intentName === 'viewIssues'){
    issueHandler.viewIssues(req,res)
  } else if(req.body.result.metadata.intentName === 'singleIssueList'){
    issueHandler.singleIssueList(req,res)
  } else if(req.body.result.metadata.intentName === 'mainMenu'){
    mainMenuHandler.mainMenu(req,res)
  }
    
})
module.exports = router 