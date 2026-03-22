const mongoose = require('mongoose');

const coursSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    instructor: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Cours', coursSchema);
