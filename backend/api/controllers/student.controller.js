//controller file facilitates communication between the route and the data access object
//this is done through the class it exports
//this file I believe should also control general backend program logic.

import studentDAO from "../../dao/studentDAO.js";
import courseDAO from "../../dao/courseDAO.js";

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

    // This will get moved into its own controller at some point, it'll stay here temporarily for testing
    static async apiLoadCourseList(req, res, next){
        const { studentNo, degree, major } = req.body;

        // Test ouput (jsut to ensure that the data is actually being sent to the backend)
        console.log(`Received degree info:`);
        console.log(`Student No: ${studentNo}`);
        console.log(`Degree: ${degree}`);
        console.log(`Major: ${major}`);

        try {
            
            // Perform recursive database query in order to get the course list
            const courseList = await courseDAO.getCourseList(degree, major);

            //console.log(`Course List:`);
            //console.log(courseList);

            // Pass course list into algorithm handler, and return sorted course list
            
            // I'll update the response structure once I get everything working correctly
            let response = {
                status: "success",
                message: "Degree information received",
                courseList: courseList,
            };
            res.json(response);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}