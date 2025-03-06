const Feedback = require('../models/feedback');
const nodemailer = require('nodemailer');

exports.createFeedback = async (req, res) => {
  try {
    const { title, location, description, mode, reporter, type, email } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '/placeholder.svg?height=200&width=400';

    const feedback = new Feedback({
      title,
      image,
      location,
      description,
      mode,
      reporter,
      type,
      email,
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

exports.getFeedbackCount = async (req, res) => {
  try {
    const totalFeedback = await Feedback.countDocuments();
    const inProgressFeedback = await Feedback.countDocuments({ status: 'In Progress' });
    const completedFeedback = await Feedback.countDocuments({ status: 'Completed' });
    const resolvedFeedback = await Feedback.countDocuments({ status: 'Resolved' });
    const UrgentFeedback = await Feedback.countDocuments({ status: 'Urgent' });

    res.status(200).json({
      totalFeedback,
      inProgressFeedback,
      completedFeedback,
      resolvedFeedback,
      UrgentFeedback,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateFeedbackStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const feedback = await Feedback.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json(feedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.sendEmail = async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    console.log("Sending email to:", email);
    console.log("Email subject:", subject);
    console.log("Email message:", message);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">Message from Authorities</h2>
          <p>${message}</p>
          <p>Thank you for your feedback. This message is generated from Crowdback.</p>
          <hr style="border: 0; border-top: 1px solid #ccc;">
          <p style="font-size: 0.9em; color: #666;">This email was sent by Crowdback. Please do not reply to this email.</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(400).json({ message: error.message });
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json({ message: 'Email sent: ' + info.response });
      }
    });
  } catch (error) {
    console.error("Error in sendEmail controller:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.DeleteFeedback = async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const feedback = await Feedback.findByIdAndDelete(feedbackId);

    if (!feedback) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).json({ message: 'Server error' });
  }
}