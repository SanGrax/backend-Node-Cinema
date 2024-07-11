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

module.exports = { createReservation, getReservations };

