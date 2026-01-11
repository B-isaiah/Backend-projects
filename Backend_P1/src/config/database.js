import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectioninstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`\n Connected to MongoDB!! ${connectioninstance.connection.host}`);
    } catch (error) {
        console.error(`connection to MongoDB fail: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;