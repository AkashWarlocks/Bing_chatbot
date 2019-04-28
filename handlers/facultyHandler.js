let hObj = {}
require('../db/mongoose')
const Faculty = require('../model/faculty')
hObj.showFaculty = (req,res)=>{
    try{
        const faculty = await Faculty.find()
        if(faculty.length === 0){
            return res.json({
                "fulfillmentText": "This is a text response",
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
            return res.json({
                "fulfillmentText": "This is a text response",
                "payload": {
                    "google": {
                      "expectUserResponse": true,
                      "richResponse": {
                        "items": [
                          {
                            "simpleResponse": {
                              "textToSpeech": "List of Faculty coming soon"
                            }
                          }
                        ]
                      }
                    }
                  }
            })
        }
    }catch{
        return res.json({
            "fulfillmentText": "This is a text response",
            "payload": {
                "google": {
                  "expectUserResponse": true,
                  "richResponse": {
                    "items": [
                      {
                        "simpleResponse": {
                          "textToSpeech": "Error: No Faculty is availabe at this moment"
                        }
                      }
                    ]
                  }
                }
              }
        })
    }
}

module.exports = hObj