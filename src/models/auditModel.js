const { getMongoDb } = require('../config/db');

const AuditModel = {
    logAction: async (data) => {
        try {
            const db = getMongoDb();
            const auditCollection = db.collection('audit_logs');
            
            const logEntry = {
                ...data,
                timestamp: new Date() // Automatically add the time of the log
            };

            await auditCollection.insertOne(logEntry);
        } catch (err) {
            console.error("Black Box Logging Error:", err);
        }
    }
};

module.exports = AuditModel;