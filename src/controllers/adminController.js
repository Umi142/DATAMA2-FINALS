const AdminModel = require('../models/adminModel');
const AuditModel = require('../models/auditModel');

// --- ADD COURSE ---
const createCourse = async (req, res, next) => {
    const { name, code, units } = req.body;
    const performer = req.user?.name || 'Unknown Admin';

    try {
        if (!name || !code || !units) throw new Error("Missing Course Name, Code, or Units.");
        
        await AdminModel.addCourse(name, code, units);
        await AuditModel.logAction({
            action: 'ADD_COURSE',
            user: performer,
            details: { name, code, units },
            status: 'SUCCESS'
        });

        res.status(201).json({ success: true, message: `Course ${code} added.` });
    } catch (err) {
        await AuditModel.logAction({ action: 'ADD_COURSE_FAILED', user: performer, details: req.body, status: 'FAILURE', errorMessage: err.message });
        next(err);
    }
};

// --- ADD PROGRAM ---
const createProgram = async (req, res, next) => {
    const { name } = req.body;
    const performer = req.user?.name || 'Unknown Admin';

    try {
        if (!name) throw new Error("Program name is required.");
        
        await AdminModel.addProgram(name);
        await AuditModel.logAction({
            action: 'ADD_PROGRAM',
            user: performer,
            details: { name },
            status: 'SUCCESS'
        });

        res.status(201).json({ success: true, message: `Program ${name} created.` });
    } catch (err) {
        await AuditModel.logAction({ action: 'ADD_PROGRAM_FAILED', user: performer, details: req.body, status: 'FAILURE', errorMessage: err.message });
        next(err);
    }
};

// --- ADD CURRICULUM ---
const createCurriculumEntry = async (req, res, next) => {
    const { programName, year, semester, courseCode } = req.body;
    const performer = req.user?.name || 'Unknown Admin';

    try {
        if (!programName || !year || !semester || !courseCode) throw new Error("Missing Curriculum parameters.");

        await AdminModel.addCurriculum(programName, year, semester, courseCode);
        await AuditModel.logAction({
            action: 'ADD_CURRICULUM',
            user: performer,
            details: { programName, year, semester, courseCode },
            status: 'SUCCESS'
        });

        res.status(201).json({ success: true, message: "Curriculum entry linked successfully." });
    } catch (err) {
        await AuditModel.logAction({ action: 'ADD_CURRICULUM_FAILED', user: performer, details: req.body, status: 'FAILURE', errorMessage: err.message });
        next(err);
    }
};

module.exports = { createCourse, createProgram, createCurriculumEntry };