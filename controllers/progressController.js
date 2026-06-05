const User = require('../models/User');

exports.getProgressData = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Calculate BMI
    let bmi = 0;
    let bmiCategory = "Unknown";
    if (user.weight && user.height) {
      const heightInMeters = user.height / 100;
      bmi = user.weight / (heightInMeters * heightInMeters);
      bmi = parseFloat(bmi.toFixed(2));
      
      if (bmi < 18.5) bmiCategory = "Underweight";
      else if (bmi < 24.9) bmiCategory = "Normal weight";
      else if (bmi < 29.9) bmiCategory = "Overweight";
      else bmiCategory = "Obese";
    }

    // Mock active dates and streak (in a real app, query WorkoutLog and FoodLog dates)
    const activeDates = ["2026-06-01", "2026-06-02", "2026-06-03", "2026-06-04", "2026-06-05"];
    
    // Mock nutrition journey (last 7 days calories)
    const nutritionJourney = [2200, 2400, 2550, 2100, 2300, 2500, 1800];
    
    // Mock radar data for muscle groups
    const radarData = {
      labels: ["CHEST", "ARMS", "LEGS", "BACK", "CORE"],
      values: [0.8, 0.7, 0.9, 0.6, 0.5]
    };

    res.status(200).json({
      success: true,
      data: {
        streakDays: 5,
        bmi: bmi,
        bmiCategory: bmiCategory,
        adjustedWeight: user.weight || 0,
        activeDates: activeDates,
        nutritionJourney: nutritionJourney,
        radarData: radarData
      }
    });
  } catch (error) {
    console.error('Get Progress Data Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
