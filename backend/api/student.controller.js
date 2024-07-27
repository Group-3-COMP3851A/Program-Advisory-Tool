//controller file facilitates communication between the route and the data access object
//this is done through the class it exports

import studentDAO from "../dao/studentDAO.js";

export default class studentCtrl {
    static async apiGetStudent (req, res, next) {
        const studentNo = parseInt(req.query.studentNo);
        
        const {studentInfo} = await studentDAO.getStudent({studentNo});

        let response = {
            studentNo: studentNo,
            student: studentInfo,
        };

        res.json(response);
    }
}