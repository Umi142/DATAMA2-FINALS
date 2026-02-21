const express = require('express');
const router = express.Router();
const { addStudent } = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

// Only users with the 'registrar' role can POST new students
router.post('/', protect(['registrar']), addStudent);
// router.get('/transcripts', getTranscripts); // GET /api/v1/students/transcripts

module.exports = router;