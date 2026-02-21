const { mysqlPool } = require('../config/db');

const StudentModel = {
    /**
     * Calls the AddStudent stored procedure.
     * SQL Reference: CREATE PROCEDURE AddStudent (ID_Number, lastName, firstName, Section) [cite: 34]
     */
    create: async (studentData) => {
        const { id_number, lastName, firstName, section } = studentData;
        
        // FLEXIBILITY: If parameters change in the SQL script, update this array only.
        const query = `CALL AddStudent(?, ?, ?, ?)`;
        const values = [id_number, lastName, firstName, section];

        const [results] = await mysqlPool.execute(query, values);
        return results;
    },

    /**
     * Fetches the transcript view.
     * SQL Reference: CREATE VIEW studentTranscripts 
     */
    getTranscripts: async () => {
        const [rows] = await mysqlPool.execute('SELECT * FROM studentTranscripts');
        return rows;
    }
};

module.exports = StudentModel;