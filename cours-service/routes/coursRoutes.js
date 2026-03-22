const express = require('express');
const {
    getAllCours, getCoursByTitle, getCoursByCategory, getCoursByInstructor,
    createCours, updateCours, deleteCours
} = require('../controllers/coursController');
const { authenticateToken, authorizeRole } = require('../middlewares/auth');

const router = express.Router();

router.get('/', authenticateToken, getAllCours);
router.get('/getByCategory', authenticateToken, getCoursByCategory);
router.get('/getByInstructor', authenticateToken, getCoursByInstructor);
router.get('/:title', authenticateToken, getCoursByTitle);

router.post('/', authenticateToken, authorizeRole(['admin']), createCours);
router.put('/:title', authenticateToken, authorizeRole(['admin']), updateCours);
router.delete('/:title', authenticateToken, authorizeRole(['admin']), deleteCours);

module.exports = router;
