//File for accessing the database.

let students;

export default class studentsDAO{
    static async injectDB(conn) {
        if (students) return //if there is already a connection, skip this
        try {
            students = await conn.db("ProgramAdvisoryTool").collection("students"); //querying students collection
        } catch (e) {
            console.error(`Unable to establish collection name in moviesDAO, you probably named the collection wrong: ${e}`);
        }
    }

    static async getStudentLogin({
        studentNo 
    } = {}) {
        let query; //the query that will be used to query the database
        query = {"_id": studentNo};

        console.log(`\n Querying the database with the following:`);
        console.log(query);

        let cursor; //cursor is essentially just query results

        try {
            cursor = await students.find(query); //query the db
        } catch (e) {
            console.error(`Query could not be completed: ${e}`); //error
            return {studentInfo: []}
        }

        try {
            const studentInfo = await cursor.toArray(); //convert the student info to an array
            return {studentInfo}; //return the result
        } catch (e) {
            console.error(`Unable to convert to Array: ${e}`);
            return {studentInfo: []};
        };
    };

    static async getHashedPassword({studentNo}){
        let query; //the query that will be used to query the database
        query = {"_id": studentNo}; //only returning the
        

        console.log(`\n Querying the database with the following:`);
        console.log(query);

        let cursor; //cursor is essentially just query results

        try {
            cursor = await students.find(query, {"_id": 0, "password": 1}); //query the db
        } catch (e) {
            console.error(`Query could not be completed: ${e}`); //error
            return null;
        }

        try {
            const studentInfo = await cursor.toArray(); //convert the student info to an array
            const password = studentInfo[0]["password"]
            return password; //return the result
        } catch (e) {
            console.error(`Unable to convert to Array: ${e}`);
            return null;
        };
    };
    
};