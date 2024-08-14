import majorDAO from "../../dao/majorDAO.js";

export default class majorCtrl {
    static async apiGetMajorList(req, res, next){

        const { degree } = req.body;

        try{
            // Perform database query in order to get the major list
            const majorList = await majorDAO.getMajorList(degree);

            // Don't really know if we would need to process list list in anyway, but we can add functionality here to do so if need be

            let response = {
                status: "success",
                majorList: majorList,
            };
            res.json(response);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}