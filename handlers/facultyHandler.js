require('../db/mongoose')
const Faculty = require('../model/faculty')
const Student = require('../model/student')
const faculty_db = require('../db/facultyDB.json')

let hObj = {}
hObj.showFaculty = async(req,res)=>{
  if(faculty_db.facultydata.length ===0){
    return res.json({
        "payload": {
            "google": {
              "expectUserResponse": true,
              "richResponse": {
                "items": [
                  {
                    "simpleResponse": {
                      "textToSpeech": "No Faculty is availabe at this moment"
                    }
                  }
                ]
              }
            }
          }
    })
}   else  {
    var resp= []
    var i;
    for (i = 0; i<faculty_db.facultydata.length; i++) {
    console.log(faculty_db.facultydata[i].facultyName)
      resp.push(
        {
          "optionInfo": {
            "key": faculty_db.facultydata[i].facultyID,
          },
          "description": faculty_db.facultydata[i].facultyID,
          "image":{
            "url": "",
            "accessibilityText": ""
          },          
          "title": faculty_db.facultydata[i].facultyName
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
                  "textToSpeech": "Choose a item"
                }
              }
            ]
          },
          "systemIntent": {
            "intent": "actions.intent.OPTION",
            "data": {
              "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
              "listSelect": {
                "title": "Faculty List",
                "items": resp
              }
            }
          }
        }
      } 
    })
}



}
hObj.showFaculty_single = async(req,res)=>{
      
  var id = req.body.result &&
      req.body.result.parameters &&
      req.body.result.parameters.id;
  
  var single_faculty = {
    "facultyName":"",
    "facultyContact":"",
    "facultyID":"",
    "facultyEmail":"",
    "facultyCourse":"",
    "officeHours":""
  }
  for(var i=0;i<faculty_db.facultydata.length;i++){
    if(faculty_db.facultydata[i].facultyID === id){
      single_faculty.facultyName = faculty_db.facultydata[i].facultyName
      single_faculty.facultyCourse = faculty_db.facultydata[i].facultyCourse
      single_faculty.facultyID = faculty_db.facultydata[i].facultyID
      single_faculty.facultyEmail = faculty_db.facultydata[i].facultyEmail
      single_faculty.facultyContact = faculty_db.facultydata[i].facultyContact
      single_faculty.officeHours = faculty_db.facultydata[i].officeHours
    }
  }
  res.json({
        "speech": "Name of Faculty is "+single_faculty.facultyName,
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
                      "title": "Facutly Name" +single_faculty.facultyName,
                      "subtitle":"ID " +single_faculty.facultyID,
                      "formattedText": "**Contact:** " +single_faculty.facultyContact+"  \n**Email:** "+single_faculty.facultyCourse+"  \n**Courses:** "+single_faculty.facultyCourse,
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