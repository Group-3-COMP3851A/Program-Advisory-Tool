
# Program Advisory Tool
The goal of this tool is to help students find a pathway to completion for their degree, at any stage of their studies. 

#### The Basic Use-Case Is:
Student selects a degree and major, and provides the courses that they have already completed. The system auto-completes as much as possible the pathway to graduation. Incomplete parts can be completed by the student manually, and the system checks if the selection of courses is valid.

# Setup
### WARNING: The code not execute unless the dependencies are installed

In order to run the backend and frontend instances, you'll need to install the associated dependencies. You will require node package manager (NPM) in order to run the specified commands. 
Node Package Manager is automatically installed when you install Node.js.  
You can download Node.js here:  
https://nodejs.org/en/download/prebuilt-installer   

Assuming you have NPM installed, the associated dependencies can be installed by running the following commands:

### Backend:
`npm init -y`  
`npm install express`  
`npm install mongodb`
`npm install cors` (This will be removed once network configuration and port issues have been resolved) 
optional: `npm i -g nodemon` this will install nodemon which removes the need to constantly restart the backend after you make a change, doing it automatically.

You will also need to edit the config.env `DATABASE_URI` value to be the connection string for your mongoDB database instance. Explained further in the server setup.

### Frontend:
(This isn't neccessary for the code to run, but what it does is create a new dedicated react application)  
(FOR DOCUMENTATION PURPOSES ONLY)  
`npx create-react-app .`  

### Server:
To see instructions for installing and setting up the server, go to [the server installation instructions](/serverInstallation/README.MD).


# Running:
### To start the tool itself, run the following commands in their respective folders:

NOTE: These commands should be completed in order as they appear (i.e start the server before the backend)
## Server:
### Windows (from the Windows installation guide):
1. From the Services console, locate the MongoDB service.
2. Right-click on the MongoDB service and click Start.

### Linux:
Follow the guide for your given distribution.

### MacOS:
`brew services start mongodb-community@7.0`

### Docker:
Assuming that you followed the tutorial including starting and running the server at least once:

`docker start mongodb`

## Backend:
`node --env-file=config.env start`
`nodemon --env-file=config.env` - if using nodemon

## Frontend:
`npm start`
