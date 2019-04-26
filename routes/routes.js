require('../db/mongoose')
const Student = require('../model/student')
//const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://user:mruaka123@cluster0-3awwl.mongodb.net/admin?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("bing_bot").collection("student");
//   // perform actions on the collection object
//   collection.find().then((d)=>{
//     data = d;
//   })
//   client.close();
// });

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
router.post('/Bing_bot',async (req,res)=>{
    console.log(JSON.stringify(req.body));
    const _id = "5cc223085e267315608f0c28"
    if(req.body.queryResult.intent.displayName === 'Students'){
      
     await Student.findById(_id).then((data)=>{
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