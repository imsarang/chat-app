const mongoose = require('mongoose')

const connectDB = async(req,res)=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log(`MongoDB conection success`);
    }catch(e){
        console.log(`MongoDB connection failure`);
        console.log(`${e}`);
    }
}

module.exports = connectDB