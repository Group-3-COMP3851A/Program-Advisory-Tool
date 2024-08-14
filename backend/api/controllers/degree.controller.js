import degreeDAO from "../../dao/degreeDAO.js";

export default class degreeCtrl {
    static async apiGetDegreeList(req, res, next){

        // If the DAO function does require an input, define it here
        const {  } = req.body;

        try{
            // Perform database query in order to get the degree list
            // Doesn't neccessarily require any input at this point in time
            const degreeList = await degreeDAO.getDegreeList();

            // Don't really know if we would need to process the list in anyway, but we can add functionality here to do so if need be

            let response = {
                status: "success",
                degreeList: degreeList,
            };
            res.json(response);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}