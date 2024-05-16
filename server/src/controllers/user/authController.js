const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/user/auth");
exports.login = async (req, res) => {
  try {
    // Find the user by username
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // User authenticated, create JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET, // Ensure you have a JWT_SECRET in your environment variables
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).send("Username already taken");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      email,
      username,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).send({
      id: user._id,
      username: user.username,
    });
  } catch (error) {
    console.error(error); // Log the detailed error
    res.status(500).send("Error in saving user: " + error.message);
  }
};

