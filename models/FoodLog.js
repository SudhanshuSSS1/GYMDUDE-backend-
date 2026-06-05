const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FoodLog = sequelize.define('FoodLog', {
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
  foodName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  calories: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  protein: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  carbs: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  fats: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  servings: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = FoodLog;
