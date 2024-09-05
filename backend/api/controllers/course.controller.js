import courseDAO from "../../dao/courseDAO.js";

export default class courseCtrl {
    static async apiGetCourse(req, res, next){

        const { courseId } = req.body;

        try{
            const course = await courseDAO.getCourse(courseId);

            // Don't really know if we would need to process the list in anyway, but we can add functionality here to do so if need be

            let response = {
                status: "success",
                course: course,
            };
            res.json(response);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiGetCourseListFromSemester(req, res, next){
        
        const { semester } = req.body;

        try{
            const courseList = await courseDAO.getCourseListFromSemester(semester);

            // Don't really know if we would need to process the list in anyway, but we can add functionality here to do so if need be

            let response = {
                status: "success",
                courseList: courseList,
            };
            res.json(response);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiGetFullCourseList(req, res, next){

        const { degree, major } = req.body;

        try{
            const courseList = await courseDAO.getFullCourseList(degree, major);

            // Don't really know if we would need to process the list in anyway, but we can add functionality here to do so if need be

            let response = {
                status: "success",
                courseList: courseList,
            };
            res.json(response);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}