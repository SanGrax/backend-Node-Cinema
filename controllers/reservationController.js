const Reservation = require('../models/Reservation'); // Import the Reservation model

// Function to create a new reservation
const createReservation = async (req, res) => { 
    try {
        const { user, movie, seats } = req.body;// Extract user, movie, and seats from the request body

        // Check if any of the seats are already reserved for the same movie
        const existingReservations = await Reservation.find({ movie });// Find all reservations for the specified movie
        const reservedSeats = existingReservations.flatMap(reservation => reservation.seats);// Get all reserved seats for the movie

         // Check if any of the requested seats are already reserved
        const overlappingSeats = seats.filter(seat => reservedSeats.includes(seat));

        if (overlappingSeats.length > 0) {
            return res.status(400).json({
                message: 'Some seats are already reserved',
                overlappingSeats
            });
        }

        // Create the reservation if there are no seat conflicts
        const reservation = new Reservation({ user, movie, seats });
        await reservation.save();
        res.status(201).json({ message: 'Reservation created successfully', reservation });
    } catch (error) {
        res.status(400).json({ message: 'Error creating reservation', error });
    }
};

// Function to get all reservations
const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('user').populate('movie');
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ message: 'Error getting reservations', error });
    }
};

// Function to get reservations by movie ID
const getReservationsByMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const reservations = await Reservation.find({ movie: movieId });// Find all reservations for the specified movie
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ message: 'Error getting reservations', error });
    }
};

// Function to get a reservation by its ID
const getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate('movie').populate('user');// Find the reservation by ID and populate movie and user details
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching reservation', error });
    }
};

// Export the functions for use in other parts of the application
module.exports = { createReservation, getReservations, getReservationsByMovie , getReservationById};

