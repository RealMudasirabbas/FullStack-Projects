import mongoose from "mongoose";

async function dbConnect() {
    try {
        
        if(mongoose.connection.readyState === 1){
            return;
        }

        const dbConnection = await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected successfully:", dbConnection.connection.host);

        

    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
}

export default dbConnect;
