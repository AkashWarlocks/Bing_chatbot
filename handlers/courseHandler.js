require('../db/mongoose')
const Course = require('../model/courses')

let hObj = {}

hObj.showCourses = async(req,res)=>{
    try{
        const courses_data = await Course.find()
    }catch(e){

    }
    

    if(course_db.course_data.length===0){
        return res.json({
            "payload": {
                "google": {
                  "expectUserResponse": true,
                  "richResponse": {
                    "items": [
                      {
                        "simpleResponse": {
                          "textToSpeech": "No Course is availabe at this moment"
                        }
                      }
                    ]
                  }
                }
              }
        })
    }
    else {
        var resp= []
    var i;
    for (i = 0; i<course_db.course_data.length; i++) {
    console.log(course_db.course_data[i].courseName)
      resp.push(
        {
          "optionInfo": {
            "key": course_db.course_data[i].courseID,
          },
          "description":"ID "+ course_db.course_data[i].courseID,
          "image":{
            "url": "",
            "accessibilityText": ""
          },          
          "title": course_db.course_data[i].courseName
        },
      )
              }
      console.log(resp)  

    return res.json({
      "speech": "Okay I will get list of issues raised in the form of list",
      "displayText": "Now you can see all the issue raised.",
      "data": {
        "google": {
          "expectUserResponse": true,
          "richResponse": {
            "items": [
              {
                "simpleResponse": {
                  "textToSpeech": "Choose a Course"
                }
              }
            ]
          },
          "systemIntent": {
            "intent": "actions.intent.OPTION",
            "data": {
              "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
              "listSelect": {
                "title": "Here is the list of Courses available in our University",
                "items": resp
              }
            }
          }
        }
      } 
    })
    }
}
hObj.singleCourse = async(req,res)=>{
    var id = req.body.result &&
      req.body.result.parameters &&
      req.body.result.parameters.id;
  
  var single_course = {
    "courseName":"",
    "courseID":""
  }
  for(var i=0;i<course_db.course_data.length;i++){
    if(course_db.course_data[i].courseID === id){
      single_course.courseName = course_db.course_data[i].courseName
      single_course.courseID = course_db.course_data[i].courseID  
    }
  }
  console.log("single Course", single_course)
  res.json({
        "speech": "Name of Faculty is "+single_course.courseName,
        "displayText": "This card contains all the details of ticket you have selected",   
        "data": {
          "google": {
            "expectUserResponse": true,
            "richResponse": {
              "items": [
                {
                  "simpleResponse": {
                    "textToSpeech": "This are the details"
                  }
                },
                {
                  "basicCard": {
                      "title": single_course.courseName,
                      "subtitle":"ID " +single_course.courseID,
                      "formattedText": "State University Of NewYork"
                  }
              },
            ],
                "suggestions": [
                  {
                    "title": "View Faculty"
                  },
                  {
                    "title": "View Courses"
                  }
                ],              
            }
          },
        },
      })
  
}

module.exports = hObj
