// This filename likely to change - I'm not sure what to call it currently. - Griffin

//route file controls which URL points to which location - controls routing around the website

import express from "express"; //import express for the Router
import algorithmCtrl from "../controllers/algorithm.controller.js"; // import the algorithm controller for generating input data for the algorithm

const router = express.Router();

// TODO: Separate this into 2 API requests, if I can :/
// There is an issue here with this request acting as a get and a post request, as it both retrieves and sends data
router.route("/getCourseList").post(algorithmCtrl.apiGetCourseList); // API request to get the course list

router.route("")

export default router;
