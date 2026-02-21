const express = require('express');
const router = express.Router();
const { addStudent } = require('../controllers/studentController');
const { enrollStudent } = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');

// Only users with the 'registrar' role can POST new students
router.post('/', protect(['registrar']), addStudent);
// router.get('/transcripts', getTranscripts); // GET /api/v1/students/transcripts

router.post('/enroll', protect(['registrar']), enrollStudent);

module.exports = router;