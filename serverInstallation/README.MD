# MongoDB Installation and Setup Instructions
## Installing the server:
To run the server, you will need to install MongoDB using one of the given methods here:
https://www.mongodb.com/docs/manual/installation/#mongodb-installation-tutorials

Installing using docker is probably the easiest method (if you already have docker) and allows MongoDB to be removed easily if you are finished with it. Note that if using docker to install, you must install docker itself if it is not already installed. 

**To reiterate: Docker is the preferred method for ease of use and access if docker is already installed. Otherwise, installing using your own OS's method may be easier.**

### MongoDB Compass:

It is also recommended to download and install MongoDB Compass to provide a GUI for CRUD operations on the database.

MongoDB Compass is available here:
https://www.mongodb.com/products/tools/compass

### MongoDB Shell (mongosh):

No matter what version you install, you will also need to install mongosh - a CLI tool for accessing and connecting to a mongoDB database. Note this may be installed with MongoDB Compass, I'm not sure.

Tutorial for installing mongosh available here:
https://www.mongodb.com/docs/mongodb-shell/install/

## Finding the Connection String:
More likely than not, your connection string for a locally hosted instance will be `mongodb://localhost:27017/<database>` where `<database>` is whatever you called your database. 

If it is not this, it likely means you changed it during the installation/running process. If this is the case, use whatever port you put there.

If for some reason you are using MongoDB Atlas, the connection string can be found in the settings for a given database.

If you still can't find it, use this: https://www.mongodb.com/docs/manual/reference/connection-string/

## Populating the database:

Note that method 1 and 3, I don't know if they work or how to make it work for MongoDB Atlas. Method 2 should work though.

### Method 1 - mongorestore from BSON (shortest, requires install):

Ensure you have installed/have access to the `mongorestore` command. If you do not, download the MongoDB Database Tools from here: https://www.mongodb.com/try/download/database-tools

1. Create a new database in MongoDB (doesn't necessarily matter what name but ensure your connection string reflects the name you choose). The initial collection also does not matter at all and can be dropped after importing the collections.
2. Open `/ProgramAdvisoryTool/BSON` in a terminal/Command prompt window.
3. Run the following command: `mongorestore -d <databaseName> --dir .`
4. Database should be populated with the collections
5. (Optional) Drop initial collection.

### Method 2 - importing JSONs via MongoDB Compass (longer, no other install):

This can be done from either the command line or MongoDB Compass.

MongoDB Compass:

1. Create a new database in MongoDB (doesn't necessarily matter what name but ensure your connection string reflects the name you choose). Initial collection can matter, you will need to make more collections anyway.
2. Create a collection for the collection you wish to import **MAKE SURE THAT THE COLLECTION NAME MATCHES THE FILENAME**.
3. Click "Add Data" after clicking the collection and them select "Import JSON or CSV file".
4. Select the file you are importing from.
5. Repeat steps 2-4 until all files are imported.

It is extremely important that the collection name matches the file name since the filenames will be what is used to query the database. If your database does not follow the code, it will not work.

### Method 3 - importing JSONs via mongoimport (longest, requires install):

I recommend just using method 1 instead of this one but if you want to for whatever reason, make sure you have installed MongoDB Database Tools from here: https://www.mongodb.com/try/download/database-tools

1. Create a new database in MongoDB (doesn't necessarily matter what name but ensure your connection string reflects the name you choose). The initial collection also does not matter at all and can be dropped after importing the collections.
2. Open `/ProgramAdvisoryTool/JSON` in a terminal/Command prompt window.
3. Run the command: `mongoimport -d <databaseName> <fileName>`.
4. Repeat step 3 for each file in the folder