// This filename likely to change - I'm not sure what to call it currently. - Griffin

//route file controls which URL points to which location - controls routing around the website

import express from "express"; //import express for the Router
import studentCtrl from "../controllers/student.controller.js"; // import the student controller for student info

const router = express.Router();

router.route("/").get(studentCtrl.apiGetStudent); //get requests to get a student, test function
router.route("/login").post(studentCtrl.apiLogin); //api login post request
router.route("/getUserPlans").post(studentCtrl.apiGetUserPlans); //api request to get a list of user plans
router.route("/addPlanToUser").post(studentCtrl.apiAddPlanToUser); //api request which adds a plan to the specified user
router.route("/removePlanFromUser").post(studentCtrl.apiRemovePlanFromUser); //api request which adds a plan to the specified user

router.route("")

export default router;
