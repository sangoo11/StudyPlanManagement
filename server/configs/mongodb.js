// configs/mongodb.js - converted to CommonJS
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/edu-organizer');

        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

module.exports = connectDB;

