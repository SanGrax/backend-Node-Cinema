const Reservation = require('../models/Reservation');

const createReservation = async (req, res) => {
    try {
        const { user, movie, seats } = req.body;
        const reservation = new Reservation({ user, movie, seats });
        await reservation.save();
        res.status(201).json({ message: 'Reservation created successfully' });
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

