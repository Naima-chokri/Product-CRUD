const mongoose = require('mongoose')
const connectDB = async() => {
    try {
        // await mongoose.connect('mongodb://localhost:27017/DSIDB');
        await mongoose.connect(process.env.MONGO_URI);
        console.log("we are connected to DB")
      } catch (error) {
        console.log(error);
      }
}
module.exports=connectDB 