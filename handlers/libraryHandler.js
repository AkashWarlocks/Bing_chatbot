const library_data = require('../db/libraryDB.json')
let hObj={}

hObj.libraryTimings = async(req,res) => {
console.log("lib: ",req.body)
return res.json({
    speech: "Can I know your good name please ?",
        displayText: "Can I know your name ?",
        source:"google"
})
}
module.exports = hObj