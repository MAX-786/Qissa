const mongoose = require('mongoose');
dotenv = require('dotenv');
dotenv.config();

const connectDB = async() => {
    try {
        const uri = process.env.MONGO_URI; // Use environment variable for connection string
        await mongoose.connect(uri);
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error(error);
        process.exit(1); // Exit process on connection failure
    }
};

module.exports = connectDB;