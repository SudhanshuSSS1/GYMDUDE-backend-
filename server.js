const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
const User = require('./models/User'); // Required to load the model
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Database connection and synchronization
sequelize
  .sync() // Use .sync({ force: true }) if you want to drop tables and recreate them
  .then(() => {
    console.log('Database connected and models synchronized.');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
