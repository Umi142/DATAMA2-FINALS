const express = require('express');
const router = express.Router();
const { addStudent, getStudentTranscript } = require('../controllers/studentController');
const { enrollStudent } = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');

// Only users with the 'registrar' role can POST new students
router.post('/', protect(['registrar']), addStudent);
// router.get('/transcripts', getTranscripts); // GET /api/v1/students/transcripts

router.post('/enroll', protect(['registrar']), enrollStudent);
router.get('/:id/transcript', protect(['registrar', 'faculty']), getStudentTranscript);

module.exports = router;