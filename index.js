const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();

// Conect to database
connectDB();

// Middleware
app.use(express.json());
app.use(require('cors')());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/reservations', reservationRoutes);

// Start Server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
