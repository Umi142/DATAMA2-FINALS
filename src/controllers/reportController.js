const ReportModel = require('../models/reportModel');
const AuditModel = require('../models/auditModel');

/**
 * Fetches the student transcript from the VIEW studenttranscripts.
 */
const getTranscript = async (req, res, next) => {
    const { id } = req.params; // Expecting ID Number (e.g., 2024-001)
    const performer = req.user?.name || 'Unknown User';

    try {
        const data = await ReportModel.getTranscript(id);

        await AuditModel.logAction({
            action: 'VIEW_TRANSCRIPT',
            user: performer,
            details: { studentId: id },
            status: 'SUCCESS'
        });

        res.status(200).json({ 
            success: true, 
            studentId: id,
            data 
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Fetches the Dean's List from the VIEW deanslist.
 */
const getDeansList = async (req, res, next) => {
    const performer = req.user?.name || 'Unknown User';

    try {
        const data = await ReportModel.getDeansList();

        await AuditModel.logAction({
            action: 'VIEW_DEANS_LIST',
            user: performer,
            status: 'SUCCESS'
        });

        res.status(200).json({ 
            success: true, 
            count: data.length, 
            data 
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Fetches a specific student's GWA using the calcGWA function.
 */
const getStudentGWA = async (req, res, next) => {
    const { id } = req.params;
    const performer = req.user?.name || 'Unknown User';

    try {
        const gwa = await ReportModel.getStudentGWA(id);

        await AuditModel.logAction({
            action: 'CHECK_GWA',
            user: performer,
            details: { studentId: id },
            status: 'SUCCESS'
        });

        res.status(200).json({ 
            success: true, 
            studentId: id, 
            gwa: gwa || "0.00" 
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getTranscript,
    getDeansList,
    getStudentGWA
};