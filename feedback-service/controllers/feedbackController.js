const Feedback = require('../models/Feedback');
const axios = require('axios');

const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTopCourses = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ note: 5 });
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getStudentFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ studentEmail: req.user.email });
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFeedbacksByCours = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ coursTitle: req.params.coursTitle });
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addFeedback = async (req, res) => {
    try {
        const idcourse = req.params.id;
        const token = req.headers.authorization;

        let courseData;  // ✅ déclaré en dehors du try
        try {
            const response = await axios.get(
                `http://localhost:5006/${encodeURIComponent(idcourse)}`, // direct
                { headers: { Authorization: token } }
            );
            courseData = response.data;         } catch (err) {
            if (err.response && err.response.status === 404) {
                return res.status(404).json({ message: "Cours not found" });
            }
            throw err;
        }

        const { note, commentaire } = req.body;
        const feedback = new Feedback({
            coursTitle: courseData.title,
            studentEmail: req.user.email,
            note,
            commentaire
        });

        await feedback.save();
        res.status(201).json(feedback);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const updateFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
        res.json(feedback);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findOneAndDelete({ _id: req.params.id });
        if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
        res.json({ message: 'Feedback deleted' });
    } catch (error) {
        
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllFeedbacks, getTopCourses, getStudentFeedback, getFeedbacksByCours,
    addFeedback, updateFeedback, deleteFeedback
};
