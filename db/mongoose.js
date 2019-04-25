const mongoose = require('mongoose')
const uri = "mongodb+srv://user:mruaka123@cluster0-3awwl.mongodb.net/test?retryWrites=true";
mongoose.connect(uri, {
    useNewUrlParser:true,
    useCreateIndex:true
}).catch((e)=>{
    console.log('Database connectivity error ',e)
})