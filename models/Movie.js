const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    releaseDate: { type: Date, required: true }
});

module.exports = mongoose.model('Movie', movieSchema);
