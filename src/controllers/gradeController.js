const GradeModel = require('../models/gradeModel');
const AuditModel = require('../models/auditModel');

const updateStudentGrade = async (req, res, next) => {
    const { fullname, courseCode, rawGrade } = req.body;
    const performer = req.user?.name || 'Unknown Performer';

    try {
        await GradeModel.updateGrade(fullname, courseCode, rawGrade);

        await AuditModel.logAction({
            action: 'GRADE_UPDATE_SUCCESS',
            user: performer,
            details: { fullname, courseCode, rawGrade },
            status: 'SUCCESS'
        });

        res.status(200).json({ success: true, message: `Grade updated for ${fullname}` });
    } catch (err) {
        // Logs the SQL error message (e.g., "Invalid Grade Input") to MongoDB
        await AuditModel.logAction({
            action: 'GRADE_UPDATE_FAILED',
            user: performer,
            details: { fullname, courseCode, rawGrade },
            status: 'FAILURE',
            errorMessage: err.message 
        });
        next(err);
    }
};

module.exports = { updateStudentGrade };