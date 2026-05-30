import mongoose from "mongoose"

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Error: " + error.message)
        process.exit(1)
    }
}

export default dbConnection;