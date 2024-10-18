//File for accessing the database.

let student;

export default class studentsDAO{
    static async injectDB(conn) {
        if (student) return //if there is already a connection, skip this
        try {
            student = await conn.db("ProgramAdvisoryTool").collection("student"); //querying students collection
        } catch (e) {
            console.error(`Unable to establish collection name in student, you probably named the collection wrong: ${e}`);
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
    
    static async getUserPlans(studentId){
        try {
            // Gets the user based off of the input student id
            let studentData = await student.findOne({ 
                student_id: studentId
            });
            if (!studentData) throw new Error("Student not found");
            
            let userPlans = studentData.plans;

            //console.log(userPlans);

            return userPlans;

        } catch (e) {
            console.error(`Unable to get plan list: ${e}`);
            return [];
        }
    };

    static async addPlanToUser(studentId, planName, degree, major, courseMap){
        try {

            const result = await student.updateOne(
                // TODO: Have it use the studentId provided by the user
                { student_id: studentId },
                { $push: { 
                    plans: { 
                        name: planName,
                        degree: degree,
                        major: major,
                        courseMap: courseMap 
                    } 
                }}
            );

            return result;

        } catch (e) {
            console.error(`Unable to add plan to user: ${e}`);
            return { error: e };
        }
    }

    static async removePlanFromUser(studentId, planName){
        try {

            const result = await student.updateOne(
                { student_id: studentId },
                { $pull: { plans: { name: planName } } }
            );
            if (!student) throw new Error("Student not found");

            return result;

        } catch (e) {
            console.error(`Unable to remove plan from user: ${e}`);
            return { error: e };
        }
    }
};