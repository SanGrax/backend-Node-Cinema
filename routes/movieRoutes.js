const express = require('express');
const { getMovies, getMovieById, addMovie } = require('../controllers/movieController');

const router = express.Router();

router.get('/', getMovies);
router.get('/:id', getMovieById);
router.post('/', addMovie);

module.exports = router;

