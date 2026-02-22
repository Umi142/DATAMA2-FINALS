const express = require('express');
const router = express.Router();
const { updateStudentGrade } = require('../controllers/gradeController');
const { protect } = require('../middleware/authMiddleware');

// Only registrar or faculty can update grades
router.put('/update', protect(['registrar', 'faculty']), updateStudentGrade);

module.exports = router;