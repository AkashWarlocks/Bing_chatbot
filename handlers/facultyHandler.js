require('../db/mongoose')
const Faculty = require('../model/faculty')
const Student = require('../model/student')
const faculty_db = require('../db/facultyDB.json')

let hObj = {}
hObj.showFaculty = async(req,res)=>{
    try{
        const faculty = await Student.find()
        console.log('Faculty : ',faculty)
        if(faculty_db.facutydata.length ===0){
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
    }catch(e){
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