const mongoose = require('mongoose');
const Schema = mongoose.Schema;// Create a shorthand for the Mongoose Schema constructor

// Define the schema for a user
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
