const dbConfig = require('./database.config');
const mongoose = require('mongoose')

mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url,{
    useNewUrlParser: true
}).then(()=>{
    console.log("Database connected successfully!");
}).catch((err)=>{
    console.log("Can't connect!",err);
    process.exit();
})