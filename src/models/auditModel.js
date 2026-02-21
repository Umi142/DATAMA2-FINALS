const { getMongoDb } = require('../config/db');

const AuditModel = {
    logAction: async (actionData) => {
        try {
            const db = getMongoDb();
            const collection = db.collection('audit_logs');
            
            const entry = {
                timestamp: new Date(),
                action: actionData.action,
                performedBy: actionData.user || 'system_admin',
                details: actionData.details,
                status: actionData.status, // 'SUCCESS' or 'FAILURE'
                errorMessage: actionData.errorMessage || null,
                ipAddress: actionData.ip || 'internal'
            };

            await collection.insertOne(entry);
        } catch (err) {
            console.error('⚠️ Black Box Critical Failure:', err.message);
        }
    }
};

module.exports = AuditModel;