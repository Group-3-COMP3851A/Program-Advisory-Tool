let courses;

export default class courseDAO{
    static async injectDB(conn) {
        if (courses) return
        try {
            courses = await conn.db("ProgramAdvisoryTool").collection("courses");
        } catch (e) {
            console.error(`Unable to establish collection name in courseDAO, you probably named the collection wrong: ${e}`);
        }
    }

    static async getCourse(courseId){
        try {
            let courseData = await courses.findOne({ 
                _id: courseId
            });
            if (!courseData) throw new Error("Course not found");

            return courseData;
            
        } catch (e) {
            console.error(`Unable to get course: ${e}`);
            return [];
        }
    }

    static async getCourseListFromSemester(semester){
        try {
            let courseData = await courses
            .find({ semester_offered: semester })
            .toArray();
            if (!courseData) throw new Error("Course not found");

            return courseData;
            
        } catch (e) {
            console.error(`Unable to get course: ${e}`);
            return [];
        }
    }
}