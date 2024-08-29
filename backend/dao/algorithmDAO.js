// This is pruely for testing retrieving data from the database based on input parameters

let degree;
let major;
let degreeCourses;
let courses;
let majorCourses;
let directedPlaceholders;

export default class algorithmDAO{
    static async injectDB(conn) {
        if (degree) return
        if (major) return
        if (degreeCourses) return
        if (courses) return
        if (majorCourses) return
        if (directedPlaceholders) return
        try {
            degree = await conn.db("ProgramAdvisoryTool").collection("degree");
            major = await conn.db("ProgramAdvisoryTool").collection("major");
            degreeCourses = await conn.db("ProgramAdvisoryTool").collection("degreeCourses");
            courses = await conn.db("ProgramAdvisoryTool").collection("courses");
            majorCourses = await conn.db("ProgramAdvisoryTool").collection("majorCourses");
            directedPlaceholders = await conn.db("ProgramAdvisoryTool").collection("directedPlaceholders");
        } catch (e) {
            console.error(`Unable to establish collection name in algorithmDAO, you probably named the collection wrong: ${e}`);
        }
    }

    static async getCourseList(degreeName, majorName){
        try {
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
    
            // Gets the list of courses where the course degree_id and _id match
            let degreeCoursesData = await degreeCourses
                .find({ degree_id: degreeData._id })
                .toArray();
            
            //console.log(degreeCoursesData);
                
            // Gets the list of courses where the course major_id and _id match
            let majorCoursesData = await majorCourses.find({ 
                major_id:  majorData._id,
                directed_status: false
                }).toArray();

            //console.log(majorCoursesData);
    
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

    static async getDirectedPlaceholders(majorName){
        try {
            // Gets the major based off of the input major name
            let majorData = await major.findOne({ 
                major_name: majorName, 
            });
            if (!majorData) throw new Error("Major not found for this degree");

            // Gets the directed object based off of the major id
            let directedObject = await directedPlaceholders.findOne({ 
                _id: majorData._id + "p"
            });

            //console.log(directedObject);

            // Returns the directed course object
            return directedObject;

        }catch (e) {
            console.error(`Unable to get course list: ${e}`);
            return [];
        }
    }
}