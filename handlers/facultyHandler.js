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
          "image": {},          
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
                "title": "Hello",
                "items": [
                  {
                    "optionInfo": {
                      "key": "first title"
                    },
                    "description": "first description",
                    "image": {
                      "url": "https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png",
                      "accessibilityText": "first alt"
                    },
                    "title": "first title"
                  },
                  {
                    "optionInfo": {
                      "key": "second"
                    },
                    "description": "second description",
                    "image": {
                      "url": "https://lh3.googleusercontent.com/Nu3a6F80WfixUqf_ec_vgXy_c0-0r4VLJRXjVFF_X_CIilEu8B9fT35qyTEj_PEsKw",
                      "accessibilityText": "second alt"
                    },
                    "title": "second title"
                  }
                ]
              }
            }
          }
        }
      }
    })
}

}

module.exports = hObj