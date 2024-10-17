
import mongoose from "mongoose";
import "@/models/Plote"; 
import "@/models/user";

type Connectionobject = {
    isConnected?: number;
}

const connections: Connectionobject = {};

async function dbConnect(): Promise<void> {
    if(connections.isConnected){
        console.log("Already connected to db");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGOOSE_URI || "");

        connections.isConnected = db.connections[0].readyState;

        console.log("DB connect successfully");
    } catch (error) {
        console.log("Db connection failled", error);
        process.exit(1)
    }
}

export default dbConnect;