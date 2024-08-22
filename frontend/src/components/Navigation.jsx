import React, { useState, useEffect } from "react";
import '../styles/navigation.css';
import Continue from "./Button";
import Card from "./Card";


//This is how navigating the website would look like. This still needs to be broken into different components

function Navigation() {


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
    <div className="navigation">

      {currentSection === 1 && (
        <div style={{ textAlign: 'center' }}>
          <h1>Welcome to Program Planner</h1>
          <h2>Choose your degree and major</h2>

          <label htmlFor="degree">Select degree:</label>
          <select id="degree" value={degree} onChange={showMajor}>
            <option value="">--Select Degree--</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Computer Science">Computer Science</option>
          </select>
          {
            degree && (
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
            )
          }
          <br />

          <Continue isEnabled={degree && major} onClick={nextSection} />

        </div >

      )
      }
      {
        currentSection === 2 && (
          <div style={{ textAlign: 'center' }}>
            <p>Step 2</p>
            <h2>Have you completed any courses?</h2>
            <button>Yes</button>
            <button onClick={nextSection}>No</button>
          </div>
        )
      }
      {
        currentSection === 3 && (
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
        )
      }
      {
        currentSection === 4 && (

          <div style={{ textAlign: 'left', fontSize: '14px', overflowY: 'auto' }}>
            <p>This program plan is for students commencing in the Cybersecurity major in Semester 1 2025. </p>
            <p> Total Units Required: 240 Units | Completed: 0units | Program Duration: 3 years full-time  </p>
            <Card />
            <p>Year 1  </p>
            <p>Semester 1 </p>
            <p>COMP1010 Computing Fundamentals (CORE) </p>
            <p>MATH1110 Mathematics for Engineering, Science & Technology 1 (CORE)  </p>
            <p>SENG1110 Object Oriented Programming (CORE)  </p>
            <p>SENG1120 Data Structure (CORE) </p>
            <p>Semester 2  </p>
            <p>COMP1140 Database and Information Management (CORE)  </p>
            <p>SENG1050 Web Technologies (CORE)  </p>
            <p>MATH1510 Discrete Mathematics (CORE)  </p>
            <p>SENG2230 Algorithms (CORE) </p>
            <p>Year 2</p>
            <p>Semester 1 (CORE) </p>
            <p>SENG2130 Systems Analysis and Design (CORE)  </p>
            <p>COMP2270 Theory of Computation (CORE)  </p>
            <p>INFT2031 Systems and Network Administration (MAJOR)  </p>
            <p>COMP3330 Machine Intelligence (DIRECTED)  </p>
            <p>Semester 2  </p>
            <p>INFT2051 Mobile Application Programming (ELECTIVE)  </p>
            <p>COMP2240 Operating Systems (CORE) </p>
            <p>SENG2260 Human-Computer Interaction (CORE)  </p>
            <p>SENG2250 System and Network Security (CORE)  </p>
            <p>Year 3  </p>
            <p>Semester 1 </p>
            <p>COMP3851A Computer Science and Information Technology WIL Part A (CORE) </p>
            <p>INFT 3800 Professional Practice in Information Technology (CORE)  </p>
            <p>COMP3260 Data Security (MAJOR)  </p>
            <p>COMP3500 Security Attacks: Analysis and Mitigation Strategies (MAJOR) </p>
            <p>Semester 2 </p>
            <p>COMP3851B Computer Science and Information Technology WIL Part B (CORE)  </p>
            <p>COMP3600 Cybersecurity Governance, Risk and Compliance (MAJOR)  </p>
            <p>SENG4500 Network and Distributed Computing (CORE)  </p>
            <p>COMP3340 Data Mining (DIRECTED) </p>
          </div>
        )
      }
    </div >

  )
}
export default Navigation