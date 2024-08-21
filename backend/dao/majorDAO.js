let degree;
let major;

export default class majorDAO{
    static async injectDB(conn) {
        if (degree) return
        try {
            degree = await conn.db("ProgramAdvisoryTool").collection("degree");
            major = await conn.db("ProgramAdvisoryTool").collection("major");
        } catch (e) {
            console.error(`Unable to establish collection name in majorDAO, you probably named the collection wrong: ${e}`);
        }
    }

    static async getMajorList(degreeName){
        try {
            // Gets the degree based off of the input degree name
            let degreeData = await degree.findOne({ 
                degree_name: degreeName 
            });
            if (!degreeData) throw new Error("Degree not found");

            // Gets the major based off of the degree's id
            let majorData = await major
            .find({ degree_id: degreeData._id })
            .toArray();
            if (!majorData) throw new Error("Major not found for this degree");

            // Returns the list of majors
            return majorData;
            
        } catch (e) {
            console.error(`Unable to get major list: ${e}`);
            return [];
        }
    }
}