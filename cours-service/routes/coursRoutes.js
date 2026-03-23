const express = require('express');
const {
    getAllCours, getCoursByid, getCoursByCategory, getCoursByInstructor,
    createCours, updateCours, deleteCours
} = require('../controllers/coursController');
const { authenticateToken, authorizeRole } = require('../middlewares/auth');

const router = express.Router();

router.get('/', authenticateToken, getAllCours);
router.get('/getByCategory', authenticateToken, getCoursByCategory);
router.get('/getByInstructor', authenticateToken, getCoursByInstructor);
router.get('/:id', authenticateToken, getCoursByid);

router.post('/', authenticateToken, authorizeRole(['admin']), createCours);
router.put('/:id', authenticateToken, authorizeRole(['admin']), updateCours);
router.delete('/:id', authenticateToken, authorizeRole(['admin']), deleteCours);

module.exports = router;
