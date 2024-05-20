
# Program Advisory Tool
The goal of this tool is to help students find a pathway to completion for their degree, at any stage of their studies. 

#### The Basic Use-Case Is:
Student selects a degree and major, and provides the courses that they have already completed. The system auto-completes as much as possible the pathway to graduation. Incomplete parts can be completed by the student manually, and the system checks if the selection of courses is valid.

# Setup
### WARNING: The code not execute unless the dependencies are installed

In order to run the backend and frontend instances, you'll need to install the associated dependencies. You will require node package manager (NPM) in order to run the specified commands. 
Node Package Manager is automatically installed when you install Node.js. You can download Node.js here:
https://nodejs.org/en/download/package-manager

Assuming you have NPM installed, the associated dependencies can be installed by running the following commands:

### Backend:
`npm init -y`
`npm install express`
`npm install cors` (This will be removed once network configuration and port issues have been resolved)

### Frontend:
(This isn't neccessary for the code to run, but what it does is create a new dedicated react application) (FOR DOCUMENTATION PURPOSES ONLY)
`npx create-react-app .`



## To start the tool itself, run the following commands in their respective folders:

NOTE: The backend needs to be started BEFORE the frontend

### Backend:
`node server.js`

### Frontend:
`npm start`
