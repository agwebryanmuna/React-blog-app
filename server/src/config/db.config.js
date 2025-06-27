import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function connectDb() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    console.log("Database connected successfully 🎉");
  } catch(error) {
    console.log('Failed to connect to database 😢');
  }
}

export default connectDb;
