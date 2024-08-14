let degree;

export default class degreeDAO{
    static async injectDB(conn) {
        if (degree) return
        try {
            degree = await conn.db("ProgramAdvisoryTool").collection("degree");
        } catch (e) {
            console.error(`Unable to establish collection name in degreeDAO, you probably named the collection wrong: ${e}`);
        }
    }

    static async getDegreeList(){
        try {
            // Gets all degrees in the collection
            let degreeData = await degree.find({});
            if (!degreeData) throw new Error("Degree not found");
            
            // Returns the list of degrees
            return degreeData;

        } catch (e) {
            console.error(`Unable to get major list: ${e}`);
            return [];
        }
    }
}