import './App.css';
import React, { useState, useEffect } from "react";

function App() {  

  //This is just a test message to show that the backend is running, and is able to send data to the frontend
  //const [message, setmessage] = useState();
  
  const [currentSection, setCurrentSection] = useState(1);  
  const [degree, setDegree] = useState('');  
  const [degreeList, setDegreeList] = useState([]);
  const [major, setMajor] = useState('');
  const [majorList, setMajorList] = useState([]);
  const [courseList, setCourseList] = useState([]);  
  const showMajor = (e) => {
    const selectedDegree = e.target.value;
    setDegree(selectedDegree);
    setMajor('');
    if (selectedDegree) {
      getMajorList(selectedDegree);
    } else {
      setMajorList([]);
    }
};  

const getDegreeList = () => {
  fetch('http://localhost:3001/api/degree/getDegreeList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    })
    .then(response => response.json())
    .then(data => {
      //console.log(data.degreeList);
      setDegreeList(data.degreeList || []);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

const getMajorList = (selectedDegree) => {
  fetch('http://localhost:3001/api/major/getMajorList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      degree: selectedDegree,
    }),
    })
    .then(response => response.json())
    .then(data => {
      //console.log(data.majorList);
      setMajorList(data.majorList || []);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

const getCourseList = (degree, major) => {
  fetch('http://localhost:3001/api/algorithm/getCourseList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      degree,
      major,
    }),
    })
    .then(response => response.json())
    .then(data => {
      //console.log(data.courseList);
      setCourseList(data.courseList || []);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

const nextSection = () => {  
  if (currentSection === 1) {  
    if (degree === 'Computer Science' && major === 'Cyber Security') {  
      // TODO: Remove the need to expose the port to the client, this information should be as hidden as possible
      // Send data to backend (we really need to create a better backend URL, because exposing our port is bad lol)
      getCourseList(degree, major);
      setCurrentSection(currentSection + 1);
    }  
  } else {  
    setCurrentSection(currentSection + 1);  
  }  
};  

const generatePlanner = () => {  
  setCurrentSection(currentSection + 1);  
};  

useEffect(() => {
  getDegreeList();
}, []);

function getFullCourseCode(internalId)
{
  let courseId = internalId.slice(-2);
  let courseName = internalId.slice(0, -2);
  let fullName = "";

  switch(courseId)
  {
    // We can add extra cases if extra courses are added to the database
    case "co":
      fullName = "COMP";
      break;
    case "se":
      fullName = "SENG";
      break;
    case "ma":
      fullName = "MATH";
      break;
    case "in":
      fullName = "INFT";
      break;
    case "el":
      fullName = "ELEC";
      break;
  }

  return fullName + courseName
}

//This is where the imported screens components will be imported into app.js which is then imported to index.js to be shown to the user
return (  
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>  
    {currentSection === 1 &&   
      <div style={{ textAlign: 'center' }}>  
        <h1>YOU SHALL NOT PASS</h1>  
      </div> 
    }  
  </div>  
);  
}  
export default App;
