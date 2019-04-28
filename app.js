const express = require('express')
var bodyParser = require('body-parser')
let routes = require('./routes/routes')
const app = express()
require('./db/mongoose')

const Student = require('./model/student')
const Faculty = require('./model/faculty')
const Course = require('./model/courses')

const port = process.env.PORT || 3000

// const MongoClient = require('mongodb').MongoClient;

// // replace the uri string with your connection string.
// const uri = "mongodb://akash:akash123@ds147446.mlab.com:47446/heroku_zxwj0zgd"
// MongoClient.connect(uri, function(err, client) {
//    if(err) {
//         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
//    }
//    console.log('Connected...');
//    const collection = client.db("heroku_zxwj0zgd").collection("Faculty");
//    // perform actions on the collection object
//    collection.findOne({
//        "facultyName":'Akash'
//    }).then((d)=>{
//        console.log('data: tp ',d)
//    })

//    client.close();
// });
async function myFn(){
    try{
        //const id = "5cc570204d105d4fac9c91f8"
        const data = await Student.find()
        console.log("student",data)
    }catch(e){
        console.log(e)
    }
    
}
myFn()

app.use(
    bodyParser.json()
)

// app.use(function (req, res, next) {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,X-Frame-Options, Content-Type, Accept');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

app.use(routes)

app.listen(port, () => {
    console.log('Server is running on port' + port)
}) 