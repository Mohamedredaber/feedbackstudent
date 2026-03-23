const express = require('express');
const {
    getAllFeedbacks, getTopCourses, getStudentFeedback, getFeedbacksByCours,
    addFeedback, updateFeedback, deleteFeedback
} = require('../controllers/feedbackController');
const { authenticateToken, authorizeRole } = require('../middlewares/auth');

const router = express.Router();
router.get('/', authenticateToken, getAllFeedbacks);
router.get('/topCourses', authenticateToken, getTopCourses);
router.get('/getStudentFeedback', authenticateToken, authorizeRole(['student']), getStudentFeedback);
router.get('/:coursTitle', authenticateToken, getFeedbacksByCours);

router.post('/:id', authenticateToken, authorizeRole(['student']), addFeedback);
router.put('/:id', authenticateToken, authorizeRole(['admin']), updateFeedback);
router.delete('/:id', authenticateToken, authorizeRole(['admin']), deleteFeedback);
module.exports = router;
