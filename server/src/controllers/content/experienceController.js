const Experience = require('../../models/content/experience');

// Add a new experience
exports.addExperience = async (req, res) => {
  try {
    const { companyName, position, startDate, endDate, description } = req.body;
    const userId = req.user.userId;

    const newExperience = new Experience({
      userId,
      companyName,
      position,
      startDate,
      endDate,
      description
    });

    await newExperience.save();

    res.status(201).json({ message: 'Experience added successfully', experience: newExperience });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding experience: ' + error.message });
  }
};

// Get experiences for a specific user
exports.getExperiencesByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const experiences = await Experience.find({ userId });

    res.status(200).json(experiences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching experiences: ' + error.message });
  }
};