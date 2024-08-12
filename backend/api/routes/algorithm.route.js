// This filename likely to change - I'm not sure what to call it currently. - Griffin

//route file controls which URL points to which location - controls routing around the website

import express from "express"; //import express for the Router
import algorithmCtrl from "../controllers/algorithm.controller.js"; // import the student controller for student info

const router = express.Router();

router.route("/getCourseList").post(algorithmCtrl.apiGetCourseList); // api request to load course list based (might move this elsewhere at somepoint, stil haven't finalized API topography yet)

router.route("")

export default router;
