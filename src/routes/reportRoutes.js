const express = require('express');
const router = express.Router();
const { 
    getTranscript, 
    getDeansList, 
    getStudentGWA 
} = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');

// Route for the Dean's List View
router.get('/deans-list', protect(['registrar', 'faculty']), getDeansList);

// Route for the Transcript View
router.get('/transcript/:id', protect(['registrar', 'faculty']), getTranscript);

// Route for specific GWA calculation
router.get('/gwa/:id', protect(['registrar', 'faculty']), getStudentGWA);

module.exports = router;