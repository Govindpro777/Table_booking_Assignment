const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookingRoutes = require('./routes/bookings');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://prajapatigovind866:77spQI85dtomU7g6@cluster0.c8mpiv9.mongodb.net/Booking')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/bookings', bookingRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});