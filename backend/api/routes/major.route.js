import express from "express"; //import express for the Router
import majorCtrl from "../controllers/major.controller.js"; // import the student controller for student info

const router = express.Router();

router.route("/getMajorList").post(majorCtrl.apiGetMajorList); // API request to get the major list

router.route("")

export default router;