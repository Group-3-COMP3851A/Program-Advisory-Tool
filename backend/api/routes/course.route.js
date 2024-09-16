import express from "express"; //import express for the Router
import courseCtrl from "../controllers/course.controller.js"; // import the course controller for course info

const router = express.Router();

router.route("/getCourse").post(courseCtrl.apiGetCourse); // API request to get the specified course
router.route("/getCourseListFromSemester").post(courseCtrl.apiGetCourseListFromSemester); // API request to return a list of courses based on the provided semester
router.route("/getFullCourseList").post(courseCtrl.apiGetFullCourseList); // API request to return a list of courses based on the provided degree and major
router.route("/getDirectedListFromSemester").post(courseCtrl.apiGetDirectedListFromSemester); // API request to return a list of courses based on the provided degree and major

router.route("")

export default router;