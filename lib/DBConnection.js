const { mongoose} = require('mongoose')
 
const connectToMongoDB = async () => {
 
try {
  const connect = await mongoose.connect(process.env.MONGO_URL)
 if (connect) console.log(`*****MongoDb is Connected*****`);
 
} catch (error) {
 console.log('Error connection to MongoDB ', error);
  process.exit(1) // 1 is failure, 0 status is success
 
}}
 
module.exports = { connectToMongoDB }