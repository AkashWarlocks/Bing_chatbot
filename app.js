const express = require('express')
var bodyParser = require('body-parser')
let routes = require('./routes/routes')
const app = express()
require('./db/mongoose')
const RIssues = require('./model/raisedissue')

const port = process.env.PORT || 3000

async function myFn(){
    
    RIssues.find().then((data)=>{
        console.log("issues: ",data)
    }).catch((e)=>{
        console.log(e)
    })
}
myFn()

app.use(
    bodyParser.json()
)

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,X-Frame-Options, Content-Type, Accept');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(routes)

app.listen(port, () => {
    console.log('Server is running on port' + port)
}) 