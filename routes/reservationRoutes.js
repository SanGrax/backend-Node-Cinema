const express = require('express');
const { createReservation, getReservations, getReservationsByMovie, getReservationById} = require('../controllers/reservationController');

const router = express.Router();

router.post('/', createReservation);
router.get('/', getReservations);
router.get('/movie/:movieId', getReservationsByMovie); // Nueva ruta para obtener reservas por ID de película
router.get('/:id', getReservationById);

module.exports = router;
