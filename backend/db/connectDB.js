const mongoose = require('mongoose')

const connectDB = async(req,res)=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log(`MongoDB connection success`.blue);
    }catch(e){
        console.log(`MongoDB connection failure`.red.bold);
        console.log(`${e}`);
    }
}

module.exports = connectDB