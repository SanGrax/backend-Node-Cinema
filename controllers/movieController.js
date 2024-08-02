const Movie = require('../models/Movie');// Import the Movie model

// Function to get all movies from the database
const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();// Fetch all movies from the database
        res.status(200).json(movies);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching movies', error });
    }
};

// Function to get a movie by its ID
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
// Function to add a new movie to the database
const addMovie = async (req, res) => {
    try {
        const { title, description, duration, releaseDate } = req.body;// Extract movie details from the request body
        const movie = new Movie({ title, description, duration, releaseDate });// Create a new movie instance with the provided details
        await movie.save();// Save the new movie to the database
        res.status(201).json({ message: 'Movie added successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error adding movie', error });
    }
};
// Export the functions for use in other parts of the application
module.exports = { getMovies, getMovieById, addMovie };

