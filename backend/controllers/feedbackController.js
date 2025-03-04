const Feedback = require('../models/feedback');


exports.createFeedback = async (req, res) => {
    try {
      const { title, location, description, mode, reporter, type } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : '/placeholder.svg?height=200&width=400';
  
      const feedback = new Feedback({
        title,
        image,
        location,
        description,
        mode,
        reporter,
        type,
      });
  
      await feedback.save();
      res.status(201).json(feedback);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

exports.getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};