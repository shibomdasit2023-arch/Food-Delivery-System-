/*
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("DB Connected");
    } catch (error) {
        console.log(error);
    }
};
*/
import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    if (isConnected && mongoose.connection.readyState === 1) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000
        });

        isConnected = true;

        console.log("DB Connected");
    } catch (error) {
        isConnected = false;

        console.error("DB CONNECTION ERROR:", error);

        throw error;
    }
};