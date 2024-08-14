import express from "express"; //import express for the Router
import degreeCtrl from "../controllers/degree.controller.js"; // import the student controller for student info

const router = express.Router();

router.route("/getDegreeList").post(degreeCtrl.apiGetDegreeList); // API request to get the major list

router.route("")

export default router;