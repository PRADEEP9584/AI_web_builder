import mongoose from "mongoose";
import dns from "dns";

// Fix for Windows / ISP DNS resolution issues with MongoDB Atlas SRV records
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://pradeep9ies_db_user:0Mz9zE886y09v3oQ@cluster0.gbtq1ke.mongodb.net/AIWEB");
        console.log("DB CONNECTED");
    } catch (error) {
        console.error("DB Connection Error:", error.message);
    }
};