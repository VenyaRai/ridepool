require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection failed:', err.message));
} else {
  console.log('MONGO_URI not set; continuing without database connection');
}

app.get('/', (req, res) => {
  res.json({
    message: 'Ridepool backend is connected',
  });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/rides', require('./routes/rides'));

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = { app };


