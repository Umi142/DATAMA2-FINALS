const { mysqlPool } = require('../config/db');

const AdminModel = {
    // CALL AddCourse(new_COURSE_NAME, new_COURSE_CODE, new_COURSE_UNITS)
    addCourse: async (name, code, units) => {
        const query = `CALL AddCourse(?, ?, ?)`;
        const [results] = await mysqlPool.execute(query, [name, code, units]);
        return results;
    },

    // CALL AddProgram(new_PROGRAM_NAME)
    addProgram: async (name) => {
        const query = `CALL AddProgram(?)`;
        const [results] = await mysqlPool.execute(query, [name]);
        return results;
    },

    // CALL AddCurriculum(entry_PROGRAM_NAME, entry_YEAR, entry_SEMESTER, entry_COURSE_CODE)
    addCurriculum: async (programName, year, semester, courseCode) => {
        const query = `CALL AddCurriculum(?, ?, ?, ?)`;
        const [results] = await mysqlPool.execute(query, [programName, year, semester, courseCode]);
        return results;
    }
};

module.exports = AdminModel;