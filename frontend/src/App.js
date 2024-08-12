import './App.css';
import React, { useState, useEffect } from "react";

function App() {  

  //This is just a test message to show that the backend is running, and is able to send data to the frontend
  //const [message, setmessage] = useState();
  
  const [currentSection, setCurrentSection] = useState(1);  
  const [degree, setDegree] = useState('');  
  const [major, setMajor] = useState('');  
  const showMajor = (e) => {  

  setDegree(e.target.value);  
  setMajor('');  

};  

const nextSection = () => {  
  if (currentSection === 1) {  
    if (degree === 'Computer Science' && major === 'Cybersecurity') {  
      // Send data to backend (we really need to create a better backend URL, because exposing our port is bad lol)
      fetch('http://localhost:3001/api/student/loadCourseList', {
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

  // TODO: Remove the need to expose the port to the client, this information should be as hidden as possible
  //fetch('http://localhost:3001/api')

    // Issues a response to the backend, polling for a specific test string
    //.then(response => response.text())

    // Sets the data received from the backend to equal the test message
    //.then(data => setMessage(data));

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
          <option value="Information Technology">Information Technology</option>  
          <option value="Computer Science">Computer Science</option>  
        </select>  
        {degree && (  
          <div>  
            <label htmlFor="major">Select major:</label>  
            <select id="major" value={major} onChange={(e) => setMajor(e.target.value)}>  
              <option value="">--Select Major--</option>  
              {degree === 'Information Technology' && (  
                <>  
                  <option value="ICT Developer">ICT Developer</option>  
                  <option value="ICT Professional">ICT Professional</option>  
                </>  
              )}  
              {degree === 'Computer Science' && (  
                <>  
                  <option value="Software Developer">Software Developer</option>  
                  <option value="Cybersecurity">Cybersecurity</option>  
                </>  
              )}  
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
        <p>{}</p>
      </div>  
    )}  
  </div>  
);  
}  
export default App;
