const EnrollmentModel = require('../models/enrollmentModel');
const AuditModel = require('../models/auditModel');

const enrollStudent = async (req, res, next) => {
    const enrollData = req.body; // Expecting the 5 fields here
    const performer = req.user?.name || 'Unknown User';

    try {
        // Validation for the 5 required fields
        if (!enrollData.fullName || !enrollData.courseCode || !enrollData.programName || !enrollData.yearId || !enrollData.semesterId) {
            const error = new Error("Missing enrollment details (Name, Course, Program, Year, or Semester)");
            error.statusCode = 400;
            throw error;
        }

        await EnrollmentModel.enroll(enrollData);

        await AuditModel.logAction({
            action: 'ENROLL_STUDENT',
            user: performer,
            details: enrollData,
            status: 'SUCCESS'
        });

        res.status(200).json({ success: true, message: "Enrollment successful." });

    } catch (err) {
        // This will capture the "Prerequisite" error from the SQL Trigger.
        await AuditModel.logAction({
            action: 'ENROLL_FAILED',
            user: performer,
            details: enrollData,
            status: 'FAILURE',
            errorMessage: err.message
        });
        next(err);
    }
};

module.exports = { enrollStudent };