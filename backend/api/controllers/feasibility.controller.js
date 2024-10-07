//feasibility checks controller

import algorithmDAO from "../../dao/algorithmDAO.js";
import { insertElectiveDependencyChecks, insertNormalCourseDependencyCheck } from "../functions/insertCourseDependencyChecks.js";

export default class FeasibilityController {
    static async apiCheckFeasibility(req, res, next){
        
        const { studentId, degree, major, completedCourses, transition, schedule } = req.body;

        try {
            // Perform database query in order to get the course list
            const courseList = await algorithmDAO.getCourseList(degree, major);
            const directedObject = await algorithmDAO.getDirectedPlaceholders(major);

            const completedCourseIds = completedCourses.map(course => course._id);

            const filteredCourseList = courseList.filter(course => !completedCourseIds.includes(course._id));
            let newSchedule;
            if (transition.sourceCourse.course._id) { //if it has an ID that means it has a course selected (need to check for ID first especially since selected directeds will still keep the code)
                newSchedule = insertNormalCourseDependencyCheck(schedule, transition.sourceCourse.course, transition.sourceCourse, transition.destinationCourse, filteredCourseList, completedCourses);
            } else {
                newSchedule = insertElectiveDependencyChecks(schedule, transition.sourceCourse.course, filteredCourseList, completedCourses);
            }

            let response = {
                status: "success",
                courseList: newSchedule,
            };
            res.json(response);

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}