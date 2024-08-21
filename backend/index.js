import app from "./server.js";
import mongodb, { ServerApiVersion } from "mongodb";
import studentDAO from "./dao/studentDAO.js";
import algorithmDAO from "./dao/algorithmDAO.js";
import degreeDAO from "./dao/degreeDAO.js";
import majorDAO from "./dao/majorDAO.js";
import courseDAO from "./dao/courseDAO.js";

// Can be modified at a later date
const port = process.env.PORT || 3001;

//defining the mongoDB client, the database connection string should come from config.env
const mongoClient = new mongodb.MongoClient(process.env.DATABASE_URI, { 
    ServerApi: {
        version: mongodb.ServerApiVersion.v1,
        deprecationErrors: true,
    }
});

mongoClient.connect().catch(err => { //trying to connect, if there is an error, print it
    console.error(err);
    process.exit(1);
}).then(async client => { //if we can connect then we can continue on to starting the server
    console.log("Connection Established");

    // Essentially just getting the database
    // Maybe it might be worth merging these into a single DAO?
    await studentDAO.injectDB(client);
    await algorithmDAO.injectDB(client);
    await degreeDAO.injectDB(client);
    await majorDAO.injectDB(client);
    await courseDAO.injectDB(client);

    app.listen(port, () => { //starting the server
        console.log(`listening on port ${port}`);
    });
});