import mongoose from "mongoose";

async function connectDB(URI) {
    try {
        const option = {
            dbName: process.env.DATABASE_NAME
        }
        await mongoose.connect(URI,{ useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`database connected`)

    } catch (error) {
        console.log(`database connection failed ${error}`)
    }
}

export default connectDB