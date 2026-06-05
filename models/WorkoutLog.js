const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WorkoutLog = sequelize.define('WorkoutLog', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  exerciseName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  muscleGroup: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = WorkoutLog;
