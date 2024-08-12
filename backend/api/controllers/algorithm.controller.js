import courseDAO from "../../dao/courseDAO.js";

export default class algorithmCtrl {
    static async apiGetCourseList(req, res, next){
        const { studentNo, degree, major } = req.body;

        // Test ouput (just to ensure that the data is actually being sent to the backend)
        console.log(`Received degree info:`);
        console.log(`Student No: ${studentNo}`);
        console.log(`Degree: ${degree}`);
        console.log(`Major: ${major}`);

        try {
            // Perform recursive database query in order to get the course list
            const courseList = await courseDAO.getCourseList(degree, major);

            // Debug output for testing
            console.log(`Course List:`);
            console.log(courseList);

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