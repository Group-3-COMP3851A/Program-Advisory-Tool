//route file for the feasiblity checks

import express from "express"; //import express for the Router
import FeasibilityController from "../controllers/feasibility.controller.js"; // import the algorithm controller for generating input data for the algorithm

const router = express.Router();

// TODO: Separate this into 2 API requests, if I can :/
// There is an issue here with this request acting as a get and a post request, as it both retrieves and sends data
router.route("/checkFeasibility").post(FeasibilityController.apiCheckFeasibility); // API request to get the course list

router.route("")

export default router;