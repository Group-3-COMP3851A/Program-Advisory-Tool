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

const nextSection = () => {  
  if (currentSection === 1) {  
    if (degree === 'Computer Science' && major === 'Cyber Security') {  
      // TODO: Remove the need to expose the port to the client, this information should be as hidden as possible
      // Send data to backend (we really need to create a better backend URL, because exposing our port is bad lol)
      fetch('http://localhost:3001/api/algorithm/getCourseList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentNo: 69420, // static until we add login functionality to the frontend
          degree,
          major,
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Data sent to backend');
        setCourseList(JSON.stringify(data.courseList, null, 2)); // This is just so its readable on the frontend
        setCurrentSection(currentSection + 1);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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

//TODO: Add Figma Prototype UI
//This will be replace with our own converted HTML
//Ideally this should be structure into separate folders for each page


//This is sample code for basic use case for Cybersecurity
return (  
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>  
    {currentSection === 1 && (  
      <div style={{ textAlign: 'center' }}>  
        <h1>Welcome to Program Planner</h1>  
        <h2>Hi Student! Choose your degree and major</h2>  
        <label htmlFor="degree">Select degree:</label>  
        <select id="degree" value={degree} onChange={showMajor}>
          <option value="">--Select Degree--</option>
          {degreeList.map((deg, index) => (
            <option key={index} value={deg.degree_name}>{deg.degree_name}</option>
          ))}
        </select>  
        {degree && (
          <div>
            <label htmlFor="major">Select major:</label>
            <select id="major" value={major} onChange={(e) => setMajor(e.target.value)}>
              <option value="">--Select Major--</option>
              {majorList.map((maj, index) => (
                <option key={index} value={maj.major_name}>{maj.major_name}</option>
              ))}
            </select>
          </div>
        )}  
        <button onClick={nextSection}>Next</button>  
      </div>  
    )}  
    {currentSection === 2 && (  
      <div style={{ textAlign: 'center' }}>  
        <p>Step 2</p>  
        <h2>Have you completed any courses?</h2>  
        <button>Yes</button>  
        <button onClick={nextSection}>No</button>  
      </div>  
    )}  
    {currentSection === 3 && (  
      <div style={{ textAlign: 'center' }}>  
        <p>Step 3</p>  
        <h2>How many courses do you plan to take?</h2>  
        <label htmlFor="courses">Select number of courses:</label>  
        <select id="courses">  
          <option value="2">2</option>  
          <option value="3">3</option>  
          <option value="4">4</option>  
        </select>  
        <button onClick={generatePlanner}>Generate Planner</button>  
      </div>  
    )}  
    {currentSection === 4 && (  

      <div style={{ textAlign: 'left', fontSize: '14px', overflowY: 'auto' }}>  
        <p>This program plan is for students commencing in the {major} major in Semester 1 2025. </p> 
        <p>Total Units Required: 240 Units | Completed: 0 units | Program Duration: 3 years full-time  </p>
        <pre style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', overflow: 'auto' }}>
          {courseList}
        </pre>
      </div>  
    )}  
  </div>  
);  
}  
export default App;
