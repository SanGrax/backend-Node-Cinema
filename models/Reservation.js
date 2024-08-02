const mongoose = require('mongoose');
const Schema = mongoose.Schema;// Create a shorthand for the Mongoose Schema constructor

// Define the schema for a reservation
const reservationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    movie: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
    seats: [{ type: String, required: true }],
    reservationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', reservationSchema);
