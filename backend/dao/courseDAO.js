let degree;
let major;
let courses;
let degreeCourses;
let majorCourses;

export default class courseDAO{
    static async injectDB(conn) {
        if (degree) return
        if (major) return
        if (courses) return
        if (degreeCourses) return
        if (majorCourses) return
        try {
            degree = await conn.db("ProgramAdvisoryTool").collection("degree");
            major = await conn.db("ProgramAdvisoryTool").collection("major");
            courses = await conn.db("ProgramAdvisoryTool").collection("courses");
            degreeCourses = await conn.db("ProgramAdvisoryTool").collection("degreeCourses");
            majorCourses = await conn.db("ProgramAdvisoryTool").collection("majorCourses");
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

            //console.log(courseData);

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

            //console.log(courseData);

            return courseData;
            
        } catch (e) {
            console.error(`Unable to get course list: ${e}`);
            return [];
        }
    }

    static async getFullCourseList(degreeName, majorName){
        try{
            // Gets the degree based off of the input degree name
            let degreeData = await degree.findOne({ 
                degree_name: degreeName 
            });
            if (!degreeData) throw new Error("Degree not found");

            //console.log(degreeData);
    
            // Gets the major based off of the input major name
            let majorData = await major.findOne({ 
                major_name: majorName, 
                degree_id: degreeData._id 
            });
            if (!majorData) throw new Error("Major not found for this degree");

            //console.log(majorData);

            let degreeCoursesData = await degreeCourses
                .find({ degree_id: degreeData._id })
                .toArray();

            let majorCoursesData = await majorCourses
                .find({ major_id: majorData._id })
                .toArray();

            // Creates a map of all the courses based on their course_id
            let degreeCourseIds = degreeCoursesData.map(dc => dc.course_id);
            let majorCourseIds = majorCoursesData.map(mc => mc.course_id);
            let courseIds = degreeCourseIds.concat(majorCourseIds);
            
            //console.log(courseIds.sort());

            let coursesData = await courses
                .find({ _id: { $in: courseIds } })
                .toArray();

            //console.log(coursesData);
    
            // Returns the list of courses
            return coursesData;

        } catch (e) {
            console.error(`Unable to get course list: ${e}`);
            return [];
        }
    }
}