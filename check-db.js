const User = require('./models/User');
const sequelize = require('./config/database');

async function check() {
  try {
    await sequelize.authenticate();
    const users = await User.findAll();
    console.log(users.map(u => ({ 
      email: u.email, 
      isVerified: u.isVerified, 
      token: u.verificationToken 
    })));
  } catch(e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}
check();
