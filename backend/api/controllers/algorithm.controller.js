import algorithmDAO from "../../dao/algorithmDAO.js";
import AlgorithmHandler from "../algorithm/handlers/AlgorithmHandler.js";

export default class algorithmCtrl {
    static async apiGetCourseList(req, res, next){
        
        const { studentId, degree, major, coursesPerSem, completedCourses } = req.body;

        try {
            // Perform database query in order to get the course list
            const courseList = await algorithmDAO.getCourseList(degree, major);
            const directedObject = await algorithmDAO.getDirectedPlaceholders(major);

            const completedCourseIds = completedCourses.map(course => course._id);

            const filteredCourseList = courseList.filter(course => !completedCourseIds.includes(course._id));

            let semCount = 6;

            switch (coursesPerSem)
            {
                case 2:
                    semCount = 12;
                    break;
                case 3:
                    semCount = 8;
                    break;
                case 4:
                    semCount = 6;
                    break;
                default:
                    semCount = 6;
                    break;
            }

            const handler = new AlgorithmHandler(filteredCourseList, directedObject, completedCourses, semCount, coursesPerSem);

            const coursePlan = handler.planSchedule;

            const courseMap = new Map(courseList.map(course => [course._id, course]));

            const schedule = coursePlan.map((semester) =>
                semester
                    .filter((course) => !!course)
                    .map((course) => courseMap.get(course.code) || course)
            );

            // console.log(schedule);

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