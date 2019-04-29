const library_db = require('../db/libraryDB.json')
let hObj={}

hObj.libraryTimings = async(req,res) => {
console.log("lib: ",req.body.result)
var date = new Date(req.body.result.parameters.id)
var day = date.getDate()
var lb_timings = {
    "day":"",
    "timings":""
}
for (var i = 0; i<library_db.library_data.length;i++){
    if(day === library_db.library_data[i].code){
       lb_timings.day = library_db.library_data[i].day
       lb_timings.timings = library_db.library_data[i].timing
    }
}
return res.json({
    "speech": "Okay..!! Follow cards for more details",
    "displayText": "Okay",   
    "data": {
      "google": {
        "expectUserResponse": true,
        "richResponse": {
          "items": [
            {
              "simpleResponse": {
                "textToSpeech": "Library Timings for " + lb_timings.day
              }
            },
            {
              "basicCard": {
                  "title": lb_timings.day,
                  "subtitle":"Timings",
                  "formattedText": "**"+lb_timings.timings+"** ",
              }
          },
        ],
            "suggestions": [
              {
                "title": "View Faculties"
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