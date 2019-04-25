const mongoose = require('mongoose')
const uri = "mongodb+srv://userDB:userdb123@cluster0-3awwl.mongodb.net/b";
mongoose.connect(uri, {
    dbName: 'bing_bot',
    useNewUrlParser:true
}).catch((e)=>{
    console.log('Database connectivity error ',e)
})