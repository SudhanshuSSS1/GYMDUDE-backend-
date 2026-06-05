const FoodLog = require('../models/FoodLog');

// Mock Database for Nutrition Search
const mockNutritionDB = [
  { name: 'Grilled Chicken', calories: 165, protein: 31.0, carbs: 0.0, fats: 3.6, unit: 'grams', baseAmount: 100.0 },
  { name: 'Chicken Breast', calories: 165, protein: 31.0, carbs: 0.0, fats: 3.6, unit: 'grams', baseAmount: 100.0 },
  { name: 'Boiled Egg', calories: 155, protein: 13.0, carbs: 1.1, fats: 11.0, unit: 'grams', baseAmount: 100.0 },
  { name: 'Oats', calories: 389, protein: 16.9, carbs: 66.3, fats: 6.9, unit: 'grams', baseAmount: 100.0 },
  { name: 'Brown Rice', calories: 111, protein: 2.6, carbs: 23.0, fats: 0.9, unit: 'grams', baseAmount: 100.0 },
  { name: 'Broccoli', calories: 34, protein: 2.8, carbs: 6.6, fats: 0.4, unit: 'grams', baseAmount: 100.0 },
];

exports.searchNutrition = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ success: false, message: 'Search query is required' });
    }

    const lowerQuery = query.toLowerCase();
    const results = mockNutritionDB.filter(food => food.name.toLowerCase().includes(lowerQuery));

    res.status(200).json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Search Nutrition Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.logFood = async (req, res) => {
  try {
    const { email, foodName, calories, protein, carbs, fats, servings, date } = req.body;

    const newLog = await FoodLog.create({
      userEmail: email,
      foodName,
      calories,
      protein,
      carbs,
      fats,
      servings,
      date
    });

    res.status(200).json({
      success: true,
      message: 'Food logged successfully'
    });
  } catch (error) {
    console.error('Log Food Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getDailyNutrition = async (req, res) => {
  try {
    const { email, date } = req.params;

    const logs = await FoodLog.findAll({
      where: {
        userEmail: email,
        date: date
      }
    });

    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    logs.forEach(log => {
      // Multiply by servings if the logged values are base values, or assume logged values are total
      // The API doc says: totalCalories: 330, and chicken is 165 for 2 servings
      // Wait, 165 * 2 = 330. So we multiply the logged base values by servings
      totalCalories += (log.calories * log.servings);
      totalProtein += (log.protein * log.servings);
      totalCarbs += (log.carbs * log.servings);
      totalFats += (log.fats * log.servings);
    });

    // Formatting for the expected response
    const formattedLogs = logs.map(log => ({
      _id: log.id,
      foodName: log.foodName,
      calories: log.calories,
      protein: log.protein,
      carbs: log.carbs,
      fats: log.fats,
      servings: log.servings,
      date: log.date
    }));

    res.status(200).json({
      success: true,
      data: {
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFats,
        logs: formattedLogs
      }
    });
  } catch (error) {
    console.error('Get Daily Nutrition Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
