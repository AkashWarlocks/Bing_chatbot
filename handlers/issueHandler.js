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
                              "textToSpeech": "Can you tell me the priority of the issue ?"
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
            return res.json({
                speech: "Issue Raised",
                displayText: "Issue Raised",
                source:"google"
        })
    }
}

module.exports = hObj