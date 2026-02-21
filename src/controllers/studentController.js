const StudentModel = require('../models/studentModel');
const AuditModel = require('../models/auditModel'); // Black Box Audit Log

const addStudent = async (req, res, next) => {
    const studentData = req.body;
    const performer = req.user?.name || 'Unknown User'; // Extracted from JWT middleware

    try {
        // 1. Validate Required Fields
        if (!studentData.id_number || !studentData.lastName || !studentData.firstName || !studentData.section) {
            const error = new Error("Validation Failed: Missing required fields.");
            error.statusCode = 400;
            throw error;
        }

        // 2. Attempt MySQL Transaction
        await StudentModel.create(studentData);

        // 3. Log Success to Black Box (MongoDB)
        await AuditModel.logAction({
            action: 'ADD_STUDENT',
            user: performer, // Actual user identity from JWT
            details: studentData,
            status: 'SUCCESS'
        });

        res.status(201).json({
            success: true,
            message: `Student ${studentData.id_number} added and logged to Black Box by ${performer}.`
        });

    } catch (err) {
        // 4. Log Failure to Black Box before passing to Error Handler
        await AuditModel.logAction({
            action: 'ADD_STUDENT_FAILED',
            user: performer, // Actual user identity from JWT
            details: studentData,
            status: 'FAILURE',
            errorMessage: err.message
        });

        next(err); // Pass error to global error handler
    }
};

module.exports = { addStudent };