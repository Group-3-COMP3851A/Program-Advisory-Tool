//controller file facilitates communication between the route and the data access object
//this is done through the class it exports

import studentDao from "../dao/studentDAO.js";

export default class studentCtrl {
    static async apiGetStudent (req, res, next) {
        const studentName = req.query.name ? req.query.name : null; //if the request contains the student name, set the name parameter to that.
        
    }
}