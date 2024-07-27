// This filename likely to change - I'm not sure what to call it currently. - Griffin

//route file controls which URL points to which location - controls routing around the website

import express from "express"; //import express for the Router
import studentCtrl from "./student.controller.js"; // import the student controller for student info

const router = express.Router();

router.route("/").get(studentCtrl.apiGetStudent);
router.route("/login").post(studentCtrl.apiLogin);

export default router;
