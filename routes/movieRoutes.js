const express = require('express');
const { getMovies, getMovieById, addMovie } = require('../controllers/movieController');

// Create a new router instance
const router = express.Router();

//Routes
router.get('/', getMovies);
router.get('/:id', getMovieById);
router.post('/', addMovie);

module.exports = router;

