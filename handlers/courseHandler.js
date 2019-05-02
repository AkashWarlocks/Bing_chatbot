require('../db/mongoose')
const Course = require('../model/courses')

let hObj = {}

hObj.showCourses = async(req,res)=>{
    try{
        const course_data = await Course.find()
        if(course_data.length===0){
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
      } else if(course_data.length === 1){
        res.json({
          "speech": "We have only one course",
          "displayText": "This card contains all the details of ticket you have selected",   
          "data": {
            "google": {
              "expectUserResponse": true,
              "richResponse": {
                "items": [
                  {
                    "simpleResponse": {
                      "textToSpeech": "Right now we have only one course availabe"
                    }
                  },
                  {
                    "basicCard": {
                        "title": "Course"+user_name,
                        "subtitle":"Course Name" +course_data[1].courseName,
                        "formattedText": "**University of New York, Binghampton** "+view_data[0].description,
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
                    },
                    {
                      "title":"Raise Issue"
                    }
                  ],              
              }
            },
          },
        })
      }
      else {
          var resp= []
      var i;
      for (i = 0; i<course_data.length; i++) {
      console.log(course_data[i].courseName)
        resp.push(
          {
            "optionInfo": {
              "key": course_data[i].courseID,
            },
            "description":"ID "+ course_data[i].courseID,
            "image":{
              "url": "",
              "accessibilityText": ""
            },          
            "title": course_data[i].courseName
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

    }catch(e){
      console.log(e)
        return res.json({
          "speech": "We Regret for inconvience there is some error",
          "displayText": "Please try again afte some time",
          "source":"google",
          "data": {
            "google": {
              "expectUserResponse": true,
              "richResponse": {
                "items": [
                  {
                    "simpleResponse": {
                      "textToSpeech": "We Regret for inconvience. Please try again after some time "
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
                    },
                    {
                      "title":"Raise Issue"
                    },
                    {
                      "title":"Main Menu"
                    }
                  ],              
              }
            },
          }
      })
    }

}
    

    

hObj.singleCourse = async(req,res)=>{
    
  var id = req.body.result &&
      req.body.result.parameters &&
      req.body.result.parameters.id;
  try {
    
    var single_course = await Course.findOne({"courseID":id})
    
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
                        "formattedText": "**State University Of New York, Binghamptop**"
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
    
  } catch (e) {
    {
      console.log(e)
        return res.json({
          "speech": "We Regret for inconvience there is some error",
          "displayText": "Please try again afte some time",
          "source":"google",
          "data": {
            "google": {
              "expectUserResponse": true,
              "richResponse": {
                "items": [
                  {
                    "simpleResponse": {
                      "textToSpeech": "We Regret for inconvience. Please try again after some time "
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
                    },
                    {
                      "title":"Raise Issue"
                    }
                  ],              
              }
            },
          }
      })
    }
  }
    
}

module.exports = hObj
