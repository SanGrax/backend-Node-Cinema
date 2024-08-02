const Reservation = require('../models/Reservation');

const createReservation = async (req, res) => {
    try {
        const { user, movie, seats } = req.body;

        // Verificar si alguno de los asientos ya está reservado para la misma película
        const existingReservations = await Reservation.find({ movie });
        const reservedSeats = existingReservations.flatMap(reservation => reservation.seats);

        const overlappingSeats = seats.filter(seat => reservedSeats.includes(seat));

        if (overlappingSeats.length > 0) {
            return res.status(400).json({
                message: 'Some seats are already reserved',
                overlappingSeats
            });
        }

        // Crear la reserva si no hay conflictos de asientos
        const reservation = new Reservation({ user, movie, seats });
        await reservation.save();
        res.status(201).json({ message: 'Reservation created successfully', reservation });
    } catch (error) {
        res.status(400).json({ message: 'Error creating reservation', error });
    }
};

const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('user').populate('movie');
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ message: 'Error getting reservations', error });
    }
};

const getReservationsByMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const reservations = await Reservation.find({ movie: movieId });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ message: 'Error getting reservations', error });
    }
};

const getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate('movie').populate('user');
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching reservation', error });
    }
};

module.exports = { createReservation, getReservations, getReservationsByMovie , getReservationById};

