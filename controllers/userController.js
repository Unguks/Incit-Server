const User = require('../models/user');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json({ email: user.email, name: user.name });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile', error: err.message });
  }
};

exports.updateName = async (req, res) => {
  const { name } = req.body;

  try {
    const user = await User.findByPk(req.user.id);
    user.name = name;
    await user.save();

    res.json({ message: 'Name updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating name', error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
  
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
  
    if (!passwordValidator(newPassword)) {
      return res.status(400).json({ message: 'New password does not meet criteria' });
    }
  
    try {
      const user = await User.findByPk(req.user.id);
  
      if (!(await bcrypt.compare(oldPassword, user.password))) {
        return res.status(401).json({ message: 'Old password is incorrect' });
      }
  
      user.password = await bcrypt.hash(newPassword, 12);
      await user.save();
  
      res.json({ message: 'Password reset successful' });
    } catch (err) {
      res.status(500).json({ message: 'Error resetting password', error: err.message });
    }
  };
  
exports.getDashboard = async (req, res) => {
    try {
      const users = await User.findAll();
      const totalUsers = users.length;
      const activeUsersToday = users.filter(user => user.lastLogin && user.lastLogin.toDateString() === new Date().toDateString()).length;
      const activeUsersLast7Days = users.filter(user => user.lastLogin && (new Date() - user.lastLogin) / (1000 * 60 * 60 * 24) <= 7).length;
  
      res.json({
        totalUsers,
        activeUsersToday,
        averageActiveUsersLast7Days: activeUsersLast7Days / 7,
        users: users.map(user => ({
          email: user.email,
          name: user.name,
          signUpTimestamp: user.createdAt,
          loginCount: user.loginCount,
          lastLogoutTimestamp: user.lastLogout,
        })),
      });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching dashboard data', error: err.message });
    }
  };

  exports.logout = async (req, res) => {
    const user = req.user;
      
      if (user) {
        await user.update({
          lastLogout: new Date(),
        });
      }

    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
  };

  // exports.logout = async (req, res) => {
  //   try {
  //     const user = req.user;
      
  //     if (user) {
  //       await user.update({
  //         lastLogout: new Date(),
  //       });
  //     }
  
  //     res.clearCookie('token');
  //     req.logout(); 
  //     res.status(200).json({ message: 'Logout successful' });
  //   } catch (err) {
  //     res.status(500).json({ message: 'Error logging out', error: err.message });
  //   }
  // };
  
  