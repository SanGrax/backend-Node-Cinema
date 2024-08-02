const mongoose = require('mongoose');
const Schema = mongoose.Schema;// Create a shorthand for the Mongoose Schema constructor

// Define the schema for a Movie
const movieSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    releaseDate: { type: Date, required: true }
});

// Export the Movie model based on the movieSchema
module.exports = mongoose.model('Movie', movieSchema);
