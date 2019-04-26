const express = require('express')
var bodyParser = require('body-parser')
let routes = require('./routes/routes')
const app = express()
require('./db/mongoose')
const Student = require('./model/student')
const port = process.env.PORT || 3000
const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
// const uri = "mongodb+srv://userDB:userdb123@cluster0-3awwl.mongodb.net/bing_bot"
// MongoClient.connect(uri, function(err, client) {
//    if(err) {
//         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
//    }
//    console.log('Connected...');
//    const collection = client.db("bing_bot").collection("student");
//    // perform actions on the collection object
//    collection.findOne({
//        "StudentName":"Test"
//    }).then((d)=>{
//        console.log('data: ',d)
//    })

//    const data = collection.find()
//    console.log('data:1 ',data)
//    client.close();
// });
function myFn (){
    Student.find().then((data)=>{
        console.log('data:1 ',data)
    }).catch((e)=>{
        console.log('data:1 ',e)
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