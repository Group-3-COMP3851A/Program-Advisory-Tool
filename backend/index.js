import app from "./server.js";
import mongodb, { ServerApiVersion } from "mongodb";
import studentDAO from "./dao/studentDAO.js";

// Can be modified at a later date
const port = process.env.PORT || 3001;

//defining the mongoDB client, the database connection string should come from config.env
const mongoClient = new mongodb.MongoClient(process.env.DATABASE_URI, { 
    ServerApi: {
        version: mongodb.ServerApiVersion.v1,
        deprecationErrors: true,
    }
});

mongoClient.connect().catch(err => {
    console.error(err);
    process.exit(1);
}).then(async client => {
    console.log("Connection Established");
    await studentDAO.injectDB(client);
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
});