import app from "./server.js";
import mongodb, { ServerApiVersion } from "mongodb";
import studentDAO from "./dao/studentDAO.js";
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
    await studentDAO.injectDB(client); //essentially just getting the database`
    await courseDAO.injectDB(client);
    app.listen(port, () => { //starting the server
        console.log(`listening on port ${port}`);
    });
});