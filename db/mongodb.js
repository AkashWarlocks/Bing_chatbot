const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://userDB:user123@bingbot-3awwl.mongodb.net/test?retryWrites=true"

//const uri = "mongodb+srv://userDB:user123@bingbot-3awwl.mongodb.net/test?retryWrites=true"

MongoClient.connect(uri,{   useNewUrlParser: true});

module.exports = MongoClient