const User = require("../models/user"); // Adjust the path to your User model

// Function to get user data
const getUserData = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user ID in the request object
    const user = await User.findById(userId).select('name email'); // Adjust fields as needed

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user ID in the request object
    const user = await User.findById(userId); // Fetch all user details

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const addPoints = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user ID in the request object
    const user = await User.findById(userId);
    console.log(user);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.points = (user.points || 0) + 10; // Increment points by 10
    await user.save();

    res.status(200).json({ message: 'Points added successfully', points: user.points });
  } catch (error) {
    console.error('Error adding points:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUserData,
  getUserDetails,
  addPoints, // Export addPoints function
};