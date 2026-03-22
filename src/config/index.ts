import dotenv from "dotenv";

dotenv.config();

const config = {
    PORT: process.env.PORT || 6000,
    MONGO_URI: process.env.MONGO_URI as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    NODE_ENV: process.env.NODE_ENV || "development",
};

// Simple validation
if (!config.MONGO_URI) {
    console.error("❌ MONGO_URI is missing in .env");
}

if (!config.JWT_SECRET) {
    console.error("❌ JWT_SECRET is missing in .env");
}

export default config;
