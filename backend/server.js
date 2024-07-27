import student from "./api/student.route.js";
const express = require('express');
const cors = require('cors');
const app = express();

// TODO: Remove the need for cors, as currently this is a potential security concern, as the ports are public :/
// Cors is enabled to bypass certain network configurations which may affect testing
app.use(cors());

app.use('/api/student', student); //when accessing the "/api/student" url, they are routed using the student route file

export default app;
