// This is pruely for testing retrieving data from the database based on input parameters

let degree;
let major;
let degreeCourses;
let courses;

export default class courseDAO{
    static async injectDB(conn) {
        if (degree) return
        if (major) return
        if (degreeCourses) return
        if (courses) return
        try {
            degree = await conn.db("ProgramAdvisoryTool").collection("degree");
            major = await conn.db("ProgramAdvisoryTool").collection("major");
            degreeCourses = await conn.db("ProgramAdvisoryTool").collection("degreeCourses");
            courses = await conn.db("ProgramAdvisoryTool").collection("courses");
        } catch (e) {
            console.error(`Unable to establish collection name in courseDAO, you probably named the collection wrong: ${e}`);
        }
    }

    static async getCourseList(degreeName, majorName){
        try {
            // Gets the degree based off of the input degree name
            let degreeData = await degree.findOne({ 
                degree_name: degreeName 
            });
            if (!degreeData) throw new Error("Degree not found");
    
            // Gets the major based off of the input major name
            let majorData = await major.findOne({ 
                major_name: majorName, 
                degree_id: degreeData._id 
            });
            if (!majorData) throw new Error("Major not found for this degree");
    
            // Gets the list of courses where the course degree_id and _id match
            let degreeCoursesData = await degreeCourses
                .find({ degree_id: degreeData._id })
                .toArray();
    
            // Creates a map of all the courses based on their course_id
            let courseIds = degreeCoursesData.map(dc => dc.course_id);
    
            // Gets a list of all courses where the course_id matches the course ids in the map
            let coursesData = await courses
                .find({ course_id: { $in: courseIds } })
                .toArray();
    
            // Returns the list of courses
            return coursesData;

        } catch (e) {
            console.error(`Unable to get course list: ${e}`);
            return [];
        }
    }
}