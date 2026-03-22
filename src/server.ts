import app from "./app";
import config from "./config";
import connectDB from "./config/db";

const startServer = async () => {
    try {
        // 1. Connect to Database
        await connectDB();

        // 2. Start Express app
        app.listen(config.PORT, () => {
            console.log(`Server running in ${config.NODE_ENV} mode on port ${config.PORT} 🚀`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
    }
};

startServer();