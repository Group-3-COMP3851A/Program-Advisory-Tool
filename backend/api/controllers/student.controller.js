//controller file facilitates communication between the route and the data access object
//this is done through the class it exports
//this file I believe should also control general backend program logic.

import studentDAO from "../../dao/studentDAO.js";

export default class studentCtrl {
    static async apiGetStudent (req, res, next) {
        const studentNo = parseInt(req.query.studentNo);
        
        const {studentInfo} = await studentDAO.getStudentLogin({studentNo}); //query the database using the dao

        let response = { //response in json format
            studentNo: studentNo,
            student: studentInfo,
        };

        res.json(response);
    }

    static async apiLogin (req, res, next) {
        const studentNo = parseInt(req.query.studentNo);

        //TODO: HASH THE INPUT PASSWORD
        const inputPassword = req.query.password; //this will be hashed later, simply a test for now.
        // https://www.freecodecamp.org/news/how-to-hash-passwords-with-bcrypt-in-nodejs/

        let password = await studentDAO.getHashedPassword({studentNo}); //retrieving the password from the db

        /* this shouldn't really return just true or false, it should probably return a token or something
        that should be used to authorise a user's requests instead of username/password 

        https://jwt.io/ JSON web tokens should be an option we look into
        
        I think the way this should work is basically as follows:
            1. generate token in backend and send it back to frontend (standard)
            2a. handle the token in the frontend to be stored in some kinda of local session storage https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
            2b. maybe create a collection to store tokens and their associated accounts?
            3. on future requests by the same user, include the token and then check the token against the
            list of tokens
            4. if token is expired, delete it from the list and say session expired or something, else
            the decoded token will contain user information which can be used to the query the database
            5. when user logs out, delete the token*/
        if (inputPassword === password) res.send(true);
        else res.send(false);
    }

    static async apiGetUserPlans (req, res, next) {

        const { studentId } = req.body;

        try {

            const userPlans = await studentDAO.getUserPlans(studentId);

            //console.log(userPlans);

            let response = {
                status: "success",
                plans: userPlans,
            };
            res.json(response);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiAddPlanToUser (req, res, next) {
        const { studentId, planName, degree, major, courseMap } = req.body;

        try{

            const result = await studentDAO.addPlanToUser(studentId, planName, degree, major, courseMap);

            res.json({ success: true, result });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiRemovePlanFromUser (req, res, next){
        const { studentId, planName } = req.body;

        try{

            const result = await studentDAO.removePlanFromUser(studentId, planName);

            res.json({ success: true, result });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiVerifyUser (req, res, next){
        const { studentId, password } = req.body;

        try{
            const studentInfo = await studentDAO.getStudentId(studentId);

            if (!studentInfo){
                return res.status(404).json({ error: "Student ID not found"});
            }

            const studentPassword = await studentDAO.getStudentPassword(studentId, password);

            if (!studentPassword){
                return res.status(401).json({ error: "Incorrect Password" });
            }

            res.json({ success: true, message: "Login successful"});
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}