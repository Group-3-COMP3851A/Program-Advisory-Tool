//feasibility checks controller

import algorithmDAO from "../../dao/algorithmDAO.js";
import { insertNormalCourseDependencyCheck } from "../functions/insertCourseDependencyChecks.js";

export default class FeasibilityController {
    static async apiCheckFeasibility(req, res, next){
        
        const { studentId, degree, major, completedCourses, transition, schedule } = req.body;

        try {
            // Perform database query in order to get the course list
            const courseList = await algorithmDAO.getCourseList(degree, major);
            const directedObject = await algorithmDAO.getDirectedPlaceholders(major);

            const completedCourseIds = completedCourses.map(course => course._id);

            const filteredCourseList = courseList.filter(course => !completedCourseIds.includes(course._id));

            let conflicts = insertNormalCourseDependencyCheck(schedule, transition.sourceCourse.course, transition.sourceCourse, transition.destinationCourse, filteredCourseList, completedCourses);

            let response = {
                status: "success",
                courseList: schedule,
            };
            res.json(response);

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}