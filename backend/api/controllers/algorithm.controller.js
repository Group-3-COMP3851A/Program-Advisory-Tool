import algorithmDAO from "../../dao/algorithmDAO.js";
import AlgorithmHandler from "../algorithm/handlers/AlgorithmHandler.js";

export default class algorithmCtrl {
    static async apiGetCourseList(req, res, next){
        
        const { studentId, degree, major } = req.body;

        try {
            // Perform database query in order to get the course list
            const courseList = await algorithmDAO.getCourseList(degree, major);
            const directedObject = await algorithmDAO.getDirectedPlaceholders(major);
            const completedCourses = []; // await algorithmDAO.getCompletedCourses(studentId);

            // Pass course list into algorithm handler, and return sorted course list
            // TODO: Maybe wrap the handler in its own algorithm object?
            
            // TODO: Fix :/
            // TODO: Retrieve the semesterCount and the coursesPerSem from the select page, instead of hardcoding
            //const handler = new AlgorithmHandler(courseList, directedObject, completedCourses, 6, 4);
            
            // I'll update the response structure once I get everything working correctly
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