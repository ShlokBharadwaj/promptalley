import mongoose from "mongoose";

let isConnected = false;

const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        // console.log("MongoDB is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.MONGODB_DB_NAME
        });

        isConnected = true;

        // console.log("MongoDB is connected");
    } catch (error) {
        // console.log("Error connecting to MongoDB", error);
    }
};

export { connectToDatabase };