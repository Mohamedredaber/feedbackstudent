const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    coursTitle: { type: String, required: true },
    studentEmail: { type: String, required: true },
    note: { type: Number, required: true, min: 1, max: 5 },
    commentaire: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema);
