const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware (allows JSON and cross-origin requests)
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth',    require('./routes/authRoutes'));
app.use('/api/stays',   require('./routes/stayRoutes'));
app.use('/api/bookings',require('./routes/bookingRoutes'));
app.use('/api/rentals', require('./routes/rentalRoutes'));
app.use('/api/food',    require('./routes/foodRoutes'));
app.use('/api/admin',   require('./routes/adminRoutes'));

// Health check
app.get('/', (req, res) => res.send('Smart Stay API is running!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));