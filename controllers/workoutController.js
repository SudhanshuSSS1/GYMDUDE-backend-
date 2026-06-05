const WorkoutLog = require('../models/WorkoutLog');

exports.logWorkout = async (req, res) => {
  try {
    const { email, exerciseName, muscleGroup, level, date } = req.body;

    await WorkoutLog.create({
      userEmail: email,
      exerciseName,
      muscleGroup,
      level,
      date
    });

    res.status(200).json({
      success: true,
      message: 'Workout logged successfully'
    });
  } catch (error) {
    console.error('Log Workout Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getDailyWorkout = async (req, res) => {
  try {
    const { email, date } = req.params;

    const logs = await WorkoutLog.findAll({
      where: {
        userEmail: email,
        date: date
      }
    });

    const formattedLogs = logs.map(log => ({
      _id: log.id,
      exerciseName: log.exerciseName,
      muscleGroup: log.muscleGroup,
      level: log.level,
      date: log.date
    }));

    res.status(200).json({
      success: true,
      data: {
        count: logs.length,
        logs: formattedLogs
      }
    });
  } catch (error) {
    console.error('Get Daily Workout Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
