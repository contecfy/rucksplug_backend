import mongoose from "mongoose";
import config from "./index";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.MONGO_URI);
        console.log(`MongoDB connected ✅: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`❌ Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
