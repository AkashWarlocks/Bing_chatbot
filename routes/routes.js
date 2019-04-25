require('../db/mongoose')
const Student = require('../model/student')

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
    const _id = "5cc223085e267315608f0c28"
    if(req.body.queryResult.intent.displayName === 'Students'){
      Student.findById(_id).then((data)=>{
        console.log('data: ', data)
        return res.json({
          "payload": {
              "google": {
                "expectUserResponse": true,
                "richResponse": {
                  "items": [
                    {
                      "simpleResponse": {
                        "textToSpeech": "this is a simple response with "+data
                      }
                    }
                  ]
                }
              }
            }
      })

    }).catch((e)=>{
        console.log('error: ',e)
        return res.json({
          "payload": {
              "google": {
                "expectUserResponse": true,
                "richResponse": {
                  "items": [
                    {
                      "simpleResponse": {
                        "textToSpeech": "error"
                      }
                    }
                  ]
                }
              }
            }
      })

    })
            }

})
module.exports = router