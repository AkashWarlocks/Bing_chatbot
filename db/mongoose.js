const mongoose = require('mongoose')
const uri = "mongodb+srv://user:mruaka123@cluster0-3awwl.mongodb.net/bing_bot?retryWrites=true";
mongoose.connect(uri, {
    useNewUrlParser:true,
}).catch((e)=>{
    console.log('Database connectivity error ',e)
})