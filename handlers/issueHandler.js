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


  try{
    const view_data = await Issue.find({"raisedBy":id})
    console.log(view_data)
    return res.json({
      speech: "We Regret for inconvience there is some error",
      displayText: "Work in progress",
      source:"google"
  })

  }catch(e){

    console.log(e)
    return res.json({
      speech: "We Regret for inconvience there is some error",
      displayText: "Please try again afte some time",
      source:"google"
  })
  }

}
module.exports = hObj