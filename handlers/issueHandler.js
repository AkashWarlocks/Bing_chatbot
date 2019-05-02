require('../db/mongoose')

const Student = require('../model/student')
const Issue = require('../model/raisedissue')
const Faculty = require('../model/faculty')

let hObj ={}
hObj.raiseIssue = async(req,res) =>{
    if(!(req.body.result &&
        req.body.result.parameters &&
        req.body.result.parameters.id)) {
            return res.json({
                speech: "Please can you give me your ID",
                displayText: "StudentID / faculty ID",
                source:"google"

        })
    } else if(!(req.body.result &&
        req.body.result.parameters &&
        req.body.result.parameters.issues)){
            return res.json({
                speech: "Following are the types of issues you can Raise please select one of them from the suggestion chips provided below",
                displayText: "**ISSUE LIST**  \n1. Hardware  \n2.Internet  \3.Account  \n4.ID card",
                source:"google",
                "data": {
                    "google": {
                      "expectUserResponse": true,
                      "richResponse": {
                        "items": [
                          {
                            "simpleResponse": {
                              "textToSpeech": "Following are the types of issues you can Raise please select one of them from the suggestion chips provided below",
                              "displayText":"**ISSUE LIST**  \n1. Hardware  \n2.Internet  \n3.Account  \n4.ID card"
                            }
                          },
                          
                        ],
                        "suggestions": [
                          {
                            "title": "Internet"
                          },
                          {
                            "title": "Hardware"
                          },
                          {
                            "title": "Account"
                          },
                          {
                              "title":"ID card"
                          }
                        ],
                
                      }
                    }
                }

        })
        } else if(!(req.body.result &&
            req.body.result.parameters &&
            req.body.result.parameters.desc)){
                return res.json({
                    speech: "Please provide description of your issue",
                    displayText: "Provide descriprion of your issue",
                    source:"google"
    
            })
        } else {
            try{
                var id = req.body.result &&
                req.body.result.parameters &&
                req.body.result.parameters.id

                const student_data =  await Student.findOne({"BNo":id})
                const faculty_data = await Faculty.findOne({"facultyID":id})

                if((!student_data) && (!faculty_data)) {
                    
                    return res.json({
                        speech: "ID you have entered is wrong",
                        displayText: "Please Raise the request again with correct ID",
                        source:"google"
                    })    
                } else{
                    //console.log(student_data)
                    //console.log(faculty_data)
                    var issue_data = {
                        "issueType":req.body.result &&
                        req.body.result.parameters &&
                        req.body.result.parameters.issues,
                        "description":req.body.result &&
                        req.body.result.parameters &&
                        req.body.result.parameters.desc,
                        "raisedBy":student_data.BNo ||faculty_data.facultyID
                    }
                   // console.log(issue_data)

                    const issue_raised = new Issue(issue_data)
                    await issue_raised.save()
                    return res.json({
                        speech: "Issue Raised",
                        displayText: "Issue Raised",
                        source:"google",
                        "data": {
                            "google": {
                              "expectUserResponse": true,
                              "richResponse": {
                                "items": [
                                  {
                                    "simpleResponse": {
                                      "textToSpeech": "Hey "+(student_data.StudentName||faculty_data.facultyName)+ "your issue regarding "+issue_data.issueType+" has been raised successfully",
                                      "displayText":"Issue Raise Successfully. Please Select your next action.  \nTo view your issues you can select View Issues Chip Below"
                                    }
                                  },
                                  
                                ],
                                "suggestions": [
                                  {
                                    "title": "View Issues"
                                  },
                                  {
                                    "title": "Raise Issue"
                                  },
                                  {
                                    "title": "View Faculty"
                                  },
                                  {
                                      "title":"View Courses"
                                  }
                                ],
                        
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
}

hObj.viewIssues = async(req,res)=>{
  var id = req.body.result &&
  req.body.result.parameters &&
  req.body.result.parameters.id

  var user_name = ""

  if(!id){
    return res.json({
      speech: "Please can you give me your ID",
      displayText: "StudentID / faculty ID",
      source:"google"

    })
  } else {
    try{
      const view_data = await Issue.find({"raisedBy":id})
      const student_data = await Student.findOne({"BNo":id})
      const faculty_data = await Faculty.findOne({"facultyID":id})
      if(!student_data){
        user_name = faculty_data.facultyName
      } else {
        if(!faculty_data) {
          user_name = student_data.StudentName
        }
      } 
      console.log(view_data)
      if(view_data.length === 0){
        if(!user_name){
          return res.json({
            speech: "You have entered a wrong ID",
            displayText: "Please Enter a valid Student/Faculty ID",
            source:"google"
        })   
      } else {
        return res.json({
          speech: "Hey "+user_name+" you dont have any issue raised. To raise a issue please click on raise issue",
          displayText: "No issues raised by "+user_name,
          source:"google"  
      })
        
      }
        
      } else if(view_data.length === 1){
        res.json({
          "speech": "Dear "+user_name+" you have raised only one issue",
          "displayText": "This card contains all the details of ticket you have selected",   
          "data": {
            "google": {
              "expectUserResponse": true,
              "richResponse": {
                "items": [
                  {
                    "simpleResponse": {
                      "textToSpeech": "Dear "+user_name+" you have raised only one issue"
                    }
                  },
                  {
                    "basicCard": {
                        "title": "Issue Raised By: "+user_name,
                        "subtitle":"Issue Type" +view_data[0].issueType,
                        "formattedText": "**Description:** "+view_data[0].description,
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
      } else {
        var resp = []
        for(var i = 0;i<view_data.length;i++){
          console.log("type of ID",typeof(JSON.stringify(view_data[i]._id)))
          var user_id = JSON.stringify(view_data[i]._id)
          resp.push(
            {
            "optionInfo": {
              "key": JSON.stringify(view_data[i]._id),
            },
            "description": view_data[i].issueType,
            "image":{
              "url": "",
              "accessibilityText": ""
            },          
            "title": "Issue Of: "+i
          })
        }
        console.log("list of issues"+resp)
        console.log("\nUsername:",user_name,"\n length",view_data.length)
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
                      "textToSpeech": "Dear "+user_name+" you have raised "+view_data.length+" issues"
                    }
                  }
                ]
              },
              "systemIntent": {
                "intent": "actions.intent.OPTION",
                "data": {
                  "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
                  "listSelect": {
                    "title": "Issue List of "+user_name,
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
        speech: "We Regret for inconvience there is some error",
        displayText: "Please try again afte some time",
        source:"google"
    })
    }
  
  }  
}

hObj.singleIssueList = async (req,res)=>{
  
  var id = req.body.result &&
  req.body.result.parameters &&
  req.body.result.parameters.id
  var user_name = ""
  const view_data = await Issue.findById(id)
  var user_id = view_data.raisedBy
  const student_data = await Student.findOne({"BNo":user_id})
  const faculty_data = await Faculty.findOne({"facultyID":user_id})

  if(!student_data){
    user_name = faculty_data.facultyName
  } else {
    if(!faculty_data) {
      user_name = student_data.StudentName
    }
  } 

  res.json({
    "speech": "Dear "+user_name+" you have raised only one issue",
    "displayText": "This card contains all the details of ticket you have selected",   
    "data": {
      "google": {
        "expectUserResponse": true,
        "richResponse": {
          "items": [
            {
              "simpleResponse": {
                "textToSpeech": "Dear "+user_name+" details of selected issues are"
              }
            },
            {
              "basicCard": {
                  "title": "Issue Raised By: "+user_name,
                  "subtitle":"Issue Type" +view_data.issueType,
                  "formattedText": "**Description:** "+view_data.description,
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

module.exports = hObj