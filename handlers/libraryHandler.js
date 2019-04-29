const library_db = require('../db/libraryDB.json')
let hObj={}

hObj.libraryTimings = async(req,res) => {
//console.log("lib: ",req.body.result)
if(!(req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.day)){
        return res.json({
            speech: "Yes buddy I can. Please give the day so that i can search for you",
                displayText: "Please enter the day",
                source:"google"
        })
    }
    else{
        var date = new Date(req.body.result.parameters.day)
var day = date.getDay()
var lb_timings = {
    "day":"",
    "timings":""
}
console.log(day)
for (var i = 0; i<library_db.library_data.length;i++){
    
    if(day === library_db.library_data[i].code){
       lb_timings.day = library_db.library_data[i].day
       lb_timings.timings = library_db.library_data[i].timing
    }
}
console.log(lb_timings)
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
                "textToSpeech": "Okay..!! Here are the required details"
              }
            },
            {
              "basicCard": {
                  "title": "Library Hours" ,
                  "subtitle":"Day - "+lb_timings.day,
                  "formattedText": "**Timings** : **"+lb_timings.timings+"** ",
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
}
module.exports = hObj