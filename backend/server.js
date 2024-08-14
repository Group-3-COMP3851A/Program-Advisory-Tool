import student from "./api/routes/student.route.js";
import algorithm from "./api/routes/algorithm.route.js";
import degree from "./api/routes/degree.route.js";
import major from "./api/routes/major.route.js";
import express from "express";
import cors from "cors";


const app = express();
app.use(express.json());

// TODO: Remove the need for cors, as currently this is a potential security concern, as the ports are public :/
// Cors is enabled to bypass certain network configurations which may affect testing
app.use(cors());

app.use('/api/student', student); //when accessing the "/api/student" url, they are routed using the student route file
app.use('/api/algorithm', algorithm); //when accessing the "/api/algorithm" url, they are routed using the algorithm route file
app.use('/api/degree', degree); //when accessing the "/api/degree" url, they are routed using the degree route file
app.use('/api/major', major); //when accessing the "/api/major" url, they are routed using the major route file

export default app;
