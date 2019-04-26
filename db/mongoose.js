const mongoose = require('mongoose')
const uri = "mongodb+srv://userDB:userdb123@cluster0-3awwl.mongodb.net";
mongoose.connect(uri, {
    dbName: "bing_bot",
    useNewUrlParser: true
}).then((conn)=>{
    console.log('Conection success')
}).catch((e)=>{
    console.log('Database connectivity error ',e)
})

module.exports = mongoose