const bodyparser = require('body-parser');
const express = require('express')
router = express()

router.use(
    bodyparser.urlencoded({
        extended: false
    })
);
router.use(
    bodyparser.json()
);
router.post('/Bing_bot', (req,res)=>{
    console.log(JSON.stringify(req.body));

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
module.exports = router