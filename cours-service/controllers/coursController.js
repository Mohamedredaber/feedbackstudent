const Cours = require('../models/Cours');

const getAllCours = async (req, res) => {
    try {
        const cours = await Cours.find();
        res.json(cours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCoursByid = async (req, res) => {
    try {
        const cours = await Cours.findById(req.params.id);
        if (!cours) return res.status(404).json({ message: 'Cours not found' });
        res.json(cours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCoursByCategory = async (req, res) => {
    try {
        const category = req.query.category;
        const cours = await Cours.find(category ? { category } : {});
        res.json(cours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCoursByInstructor = async (req, res) => {
    try {
        const instructor = req.query.instructor;
        const cours = await Cours.find(instructor ? { instructor } : {});
        res.json(cours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCours = async (req, res) => {
    try {
        const cours = new Cours(req.body);
        await cours.save();
        res.status(201).json(cours);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateCours = async (req, res) => {
    try {
        const cours = await Cours.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (!cours) return res.status(404).json({ message: 'Cours not found' });
        res.json(cours);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const deleteCours = async (req, res) => {
    try {
        const cours = await Cours.findOneAndDelete({ _id: req.params.id });
        if (!cours) return res.status(404).json({ message: 'Cours not found' });
        res.json({ message: 'Cours deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    getAllCours, getCoursByid, getCoursByCategory, getCoursByInstructor,
    createCours, updateCours, deleteCours
};
