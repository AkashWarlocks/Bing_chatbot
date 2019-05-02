let hObj = {}

hObj.mainMenu = async(req,res) => {
    console.log("Main menu: ",res)
    res.json({
        "speech": "Name of Faculty is ",
        "displayText": "This card contains all the details of ticket you have selected",   
        "data": {
            "google": {
              "expectUserResponse": true,
              "richResponse": {
                "items": [
                  {
                    "simpleResponse": {
                      "textToSpeech": "Hi I am here to help you, welcome to the main menu of Bing Buddy"
                    }
                  },
                  {
                    "basicCard": {
                      "title": "BING BUDDY",
                      "subtitle": "The best public university in the northeast.",
                      "formattedText": "Rise Above Hate",
                      "image": {
                        "url": "https://www.binghamton.edu/uctd/images/binghamton-university-sign.jpg",
                        "accessibilityText": "College"
                      },
                      "buttons": [
                        {
                          "title": "State University Of New York, Binghampton",
                          "openUrlAction": {
                            "url": "https://www.binghamton.edu/"
                          }
                        }
                      ],
                      "imageDisplayOptions": "CROPPED"
                    }
                  }
                ],
                   
              }
            }
          }
      })
    }



module.exports = hObj