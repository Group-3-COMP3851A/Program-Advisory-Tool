import algorithmDAO from "../../dao/algorithmDAO.js";
import AlgorithmHandler from "../algorithm/handlers/AlgorithmHandler.js";

export default class algorithmCtrl {
    static async apiGetCourseList(req, res, next){
        
        const { studentId, degree, major, semCount, coursesPerSem } = req.body;

        try {
            // Perform database query in order to get the course list
            const courseList = await algorithmDAO.getCourseList(degree, major);
            const directedObject = await algorithmDAO.getDirectedPlaceholders(major);
            const completedCourses = []; // await algorithmDAO.getCompletedCourses(studentId);

            const handler = new AlgorithmHandler(courseList, directedObject, completedCourses, semCount, coursesPerSem);

            const coursePlan = handler.planSchedule;

            const courseMap = new Map(courseList.map(course => [course._id, course]));

            const schedule = coursePlan.map(semester => semester.map(course => courseMap.get(course.code) || course));

            const scheduleMap = [];

            for (let i = 0; i < schedule.length; i += 2)
            {
                const year = [schedule[i], schedule[i + 1] || []];
                
                scheduleMap.push(year);
            }

            //console.log(scheduleMap);
            
            // I'll update the response structure once I get everything working correctly
            let response = {
                status: "success",
                courseList: scheduleMap,
            };
            res.json(response);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}