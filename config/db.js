const mongoose = require('mongoose');

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
         // Attempt to connect to the MongoDB database using mongoose
        await mongoose.connect('mongodb://localhost:27017/cinema', {
            useNewUrlParser: true, // Use the new URL parser instead of the deprecated one
            useUnifiedTopology: true,// Use the new Server Discover and Monitoring engine
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};
// Export the connectDB function to be used in other parts of the application
module.exports = connectDB;
