const mongoose = require('mongoose')

const uri = "mongodb+srv://userDB:user123@bingbot-3awwl.mongodb.net/test?retryWrites=true";

const url = "mongodb://user:mruaka123@cluster0-shard-00-00-3awwl.mongodb.net:27017,cluster0-shard-00-01-3awwl.mongodb.net:27017,cluster0-shard-00-02-3awwl.mongodb.net:27017/bing_bot?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"

const heroku_uri = "mongodb://@ds147446.mlab.com:47446/heroku_zxwj0zgd"
/**
 * auth:{
        user:'heroku_zxwj0zgd',
        password:'heroku_zxwj0zgd'
    },
 */
//dbName: "heroku_zxwj0zgd",
mongoose.connect(uri, {
    dbName:"BingBot",
    useNewUrlParser: true,
})
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose