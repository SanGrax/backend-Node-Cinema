const Movie = require('../models/Movie');

const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching movies', error });
    }
};

const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (movie) {
            res.status(200).json(movie);
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error fetching movie', error });
    }
};
const addMovie = async (req, res) => {
    try {
        const { title, description, duration, releaseDate } = req.body;
        const movie = new Movie({ title, description, duration, releaseDate });
        await movie.save();
        res.status(201).json({ message: 'Movie added successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error adding movie', error });
    }
};

module.exports = { getMovies, getMovieById, addMovie };

