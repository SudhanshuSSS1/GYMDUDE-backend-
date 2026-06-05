const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
const User = require('./models/User'); // Required to load the model
const FoodLog = require('./models/FoodLog');
const WorkoutLog = require('./models/WorkoutLog');
const authRoutes = require('./routes/authRoutes');
const nutritionRoutes = require('./routes/nutritionRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const progressRoutes = require('./routes/progressRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', nutritionRoutes);
app.use('/api', workoutRoutes);
app.use('/api', progressRoutes);

// Database connection and synchronization
sequelize
  .sync({ alter: true }) // Update tables without dropping data
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
