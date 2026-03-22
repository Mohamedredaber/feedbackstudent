const express = require('express');
const { register, login ,getallusers } = require('../controllers/userController');
const { authenticateToken, authorizeRole } = require('../middlewares/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', authenticateToken, authorizeRole(['admin']), getallusers);

module.exports = router;
