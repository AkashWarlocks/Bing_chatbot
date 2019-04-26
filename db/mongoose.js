const mongoose = require('mongoose')
const uri = "mongodb+srv://user:mruaka123@cluster0-3awwl.mongodb.net/bing_bot";
const url = "mongodb://user:mruaka123@cluster0-shard-00-00-3awwl.mongodb.net:27017,cluster0-shard-00-01-3awwl.mongodb.net:27017,cluster0-shard-00-02-3awwl.mongodb.net:27017/bing_bot?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"
const heroku_uri = "mongodb://user:user123@ds147446.mlab.com:47446/heroku_zxwj0zgd"
mongoose.connect(heroku_uri, {
    dbName: "heroku_zxwj0zgd",
    useNewUrlParser: true
}).then((conn)=>{
    console.log('Conection success')
}).catch((e)=>{
    console.log('Database connectivity error ',e)
})

