//controller file facilitates communication between the route and the data access object
//this is done through the class it exports

import studentDAO from "../dao/studentDAO.js";

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
        const inputPassword = req.query.password; //this will be hashed later, simply a test for now.

        let password = await studentDAO.getHashedPassword({studentNo}); //retrieving the password from the db

        if (inputPassword == password) res.send(true);
        else res.send(false);
    }
}