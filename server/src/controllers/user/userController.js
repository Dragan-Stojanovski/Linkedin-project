const User = require("../../models/user/auth");

const getUserOwnData = async (req, res) => {
  try {
    // Fetching user data and excluding the password field
    const userData = await User.findById(req.user.userId).select("-password");
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const searchUsers = async (req, res) => {
  const searchTerm = req.body.searchTerm;
  if (!searchTerm) {
    // If searchTerm is empty, undefined, or null, return an empty array
    return res.json([]);
  }
  try {
      const regex = new RegExp(searchTerm, 'i');
      const users = await User.find({
          $or: [
              { username: regex },
              { email: regex }
          ]
      });
      res.json(users);
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
};

const updateUser = async (req, res) => {
  const { username, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { username, email },
      { new: true, runValidators: true }
    ).select('-password');
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getUserOwnData, searchUsers, updateUser };
