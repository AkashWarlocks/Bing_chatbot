require('../db/mongoose')
const Faculty = require('../model/faculty')
const Student = require('../model/student')
//const faculty_db = require('../db/facultyDB.json')

let hObj = {}
hObj.showFaculty = async(req,res)=>{

  try{
    const facultydata = await Faculty.find()
    console.log("faculty: ",facultydata)

    if(facultydata.length ===0){
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
      for (i = 0; i<facultydata.length; i++) {
      console.log(facultydata[i].facultyName)
        resp.push(
          {
            "optionInfo": {
              "key": facultydata[i].facultyID,
            },
            "description": facultydata[i].facultyID,
            "image":{
              "url": "",
              "accessibilityText": ""
            },          
            "title": facultydata[i].facultyName
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
  }catch(e){
    return res.json({
      speech: "We Regret for inconvience there is some error",
      displayText: "Please try again afte some time",
      source:"google"
  })
  }
  





}
hObj.showFaculty_single = async(req,res)=>{
      
  var id = req.body.result &&
      req.body.result.parameters &&
      req.body.result.parameters.id;

  try{
    
    const single_faculty = await Faculty.findById(id)
    console.log("single emp", single_faculty)
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
                      "title": single_faculty.facultyName,
                      "subtitle":"ID " +single_faculty.facultyID,
                      "formattedText": "**Contact:** " +single_faculty.facultyContact+"  \n**Email:** "+single_faculty.facultyEmail+"  \n**Courses:** "+single_faculty.facultyCourse,
                  }
              },
            ],
                "suggestions": [
                  {
                    "title": "View Faculty"
                  },
                  {
                    "title": "View Courses"
                  },
                  {
                    "title":"Library Timings"
                  }
                ],              
            }
          },
        },
      })
  
  }catch(e){
    return res.json({
      speech: "We Regret for inconvience there is some error",
      displayText: "Please try again afte some time",
      source:"google"
  })
  }
  
  
    }

module.exports = hObj