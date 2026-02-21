const { mysqlPool } = require('../config/db');

const EnrollmentModel = {
    enroll: async (enrollData) => {
        const { fullName, courseCode, programName, yearId, semesterId } = enrollData;
        
        const query = `CALL StudentEnroll(?, ?, ?, ?, ?)`;
        const values = [fullName, courseCode, programName, yearId, semesterId];

        const [results] = await mysqlPool.execute(query, values);
        return results;
    }
};

module.exports = EnrollmentModel;