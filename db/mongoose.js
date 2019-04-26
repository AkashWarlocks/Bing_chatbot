const mongoose = require('mongoose')
const uri = "mongodb+srv://userDB:userdb123@cluster0-3awwl.mongodb.net/bing_bot";
mongoose.connect(uri, {
    dbName: "bing_bot"
}).then((conn)=>{
    console.log('Conection success')
}).catch((e)=>{
    console.log('Database connectivity error ',e)
})