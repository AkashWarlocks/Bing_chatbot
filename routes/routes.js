const express = require('express')
const bodyparser = require('body-parser');

app.use(
    bodyparser.urlencoded({
        extended: false
    })
);
app.use(
    bodyparser.json()
);
router.post('/Bing_bot', (req,res)=>{
    if(req.body.intent.displayName === 'Students'){
        return res.json({
            "payload": {
                "google": {
                  "expectUserResponse": true,
                  "richResponse": {
                    "items": [
                      {
                        "simpleResponse": {
                          "textToSpeech": "this is a simple response"
                        }
                      }
                    ]
                  }
                }
              }
        })
    }

})
router = express()
