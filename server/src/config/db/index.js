import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
async function connect() {
    try {
        await mongoose.connect(`${process.env.DB_URL}`)
        console.log(`💲💲💲 Connected to MongoDB: ${process.env.DB_URL}`)
    } catch (error) {
        console.log("💲💲💲 ~ connect ~ error:", error)
    }
}
export default { connect }

