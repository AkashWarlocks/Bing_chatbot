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
    
      resp.push({
                        
        "optionInfo": {
                        "key": faculty_db.facultydata[i].facultyID
                      },
                      "description": "Faculty ID"+faculty_db.facultydata[i].facultyID,
                      "image": "",
                      "title": "Faculty Name" +faculty_db.facultydata[i].facultyName,
                    
                })
              }  

    return res.json({
        "payload": {
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
                  "title": "Hello",
                  "items": resp
                }
              }
            }
          }
        }
    })
}

}

module.exports = hObj