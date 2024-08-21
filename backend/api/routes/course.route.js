import express from "express"; //import express for the Router
import courseCtrl from "../controllers/course.controller.js"; // import the course controller for course info

const router = express.Router();

router.route("/getCourse").post(courseCtrl.apiGetCourse); // API request to get the specified course

router.route("")

export default router;