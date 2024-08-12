// This filename likely to change - I'm not sure what to call it currently. - Griffin

//route file controls which URL points to which location - controls routing around the website

import express from "express"; //import express for the Router
import studentCtrl from "../controllers/student.controller.js"; // import the student controller for student info

const router = express.Router();

router.route("/").get(studentCtrl.apiGetStudent); //get requests to get a student, test function
router.route("/login").post(studentCtrl.apiLogin); //api login post request
router.route("/loadCourseList").post(studentCtrl.apiLoadCourseList); // api request to load course list based (might move this elsewhere at somepoint, stil haven't finalized API topography yet)

router.route("")

export default router;
