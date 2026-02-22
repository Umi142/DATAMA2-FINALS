const StudentModel = require('../models/studentModel');
const AuditModel = require('../models/auditModel'); 

const addStudent = async (req, res, next) => {
    const studentData = req.body;
    const performer = req.user?.name || 'Unknown User'; 

    try {
        // 1. Validate Required Fields (Matches ID_Number, lastName, firstName, Section in SQL)
        if (!studentData.idNumber || !studentData.lastName || !studentData.firstName || !studentData.section) {
            const error = new Error("Validation Failed: Missing idNumber, lastName, firstName, or section.");
            error.statusCode = 400;
            throw error;
        }

        // 2. Attempt MySQL Transaction (Calling the CALL AddStudent procedure via Model)
        // Note: Renamed .create to .add to match the new Model naming
        await StudentModel.add(studentData);

        // 3. Log Success to Black Box (MongoDB)
        await AuditModel.logAction({
            action: 'ADD_STUDENT',
            user: performer,
            details: studentData,
            status: 'SUCCESS'
        });

        res.status(201).json({
            success: true,
            message: `Student ${studentData.idNumber} added successfully.`
        });

    } catch (err) {
        // 4. Log Failure to Black Box
        await AuditModel.logAction({
            action: 'ADD_STUDENT_FAILED',
            user: performer,
            details: studentData,
            status: 'FAILURE',
            errorMessage: err.message
        });

        next(err); 
    }
};

// Note: getStudentTranscript is now handled by reportController.js 

module.exports = { addStudent };