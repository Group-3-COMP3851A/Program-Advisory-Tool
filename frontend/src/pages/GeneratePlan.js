import React, { useState, useEffect } from 'react'; // Importing React, useState, and useEffect hooks
import OutlinedCard from '../components/Card'; // Importing the Card component
import DropArea from '../components/DropArea'; // Importing the DropArea component
import Text from '../components/Text'; // Importing the Text component
import Menu from '../components/Menu'; // Importing the Menu component
import Button from '../components/Button'; // Importing the Button component
import { useNavigate, useLocation } from 'react-router-dom'; // Importing the useNavigate hook from react-router-dom
import Link from '../components/Link'; // Importing the Link component

const GeneratePlan = () => {
    const location = useLocation();
    const { degree, major, semCount, coursesPerSem } = location.state || {};
    const [courseList, setCourseList] = useState([]);
    const navigate = useNavigate(); // Initializing the useNavigate hook for navigation

    const getCourseList = (degree, major, semCount, coursesPerSem) => {
        fetch('http://localhost:3001/api/algorithm/getCourseList', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studentId: 12345, // static until we add login functionality to the frontend
            degree,
            major,
            semCount,
            coursesPerSem
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

    useEffect(() => {
        getCourseList(degree, major, semCount, coursesPerSem);
        //console.log(courseList);
    }, []); // Empty dependency array means this effect runs once when the component mounts

    const handleEditClick = () => {
        // Function to handle the "Edit" button click
        navigate('/view-planner'); // Navigate to the "View Planner" page
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            <Menu /> {/* Menu component */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                {/* Main content container */}
                <Text type="h1" style={{ marginBottom: '20px' }}>Course Plan</Text> {/* Page heading */}
                <Button onClick={handleEditClick} text="Edit" color="#007bff" /> {/* Edit button, triggers handleEditClick function */}
                {Object.keys(courseList).map((year, yearIndex) => (
                    // Iterate over each year in groupedCards
                    <div key={yearIndex} style={{ marginBottom: '20px', width: '95%' }}>
                        <Text type="h2" style={{ marginBottom: '10px' }}>Year {yearIndex + 1}</Text> {/* Display the year */}
                        {Object.keys(courseList[yearIndex]).map((semester, semesterIndex) => (
                            // Iterate over each semester in the year
                            <div key={semesterIndex} style={{ marginBottom: '20px' }}>
                                <Text type="h3" style={{ marginBottom: '10px' }}>Semester {semesterIndex + 1}</Text> {/* Display the semester */}
                                <DropArea>
                                    <div style={{ display: 'flex', flexDirection: 'column'}}>
                                        {/* DropArea component to hold the course cards */}
                                        {courseList[yearIndex][semesterIndex].map((course) => (
                                            // Iterate over each course in the semester and display a Card component
                                            <OutlinedCard key={course._id} text={course} /> 
                                        ))}
                                    </div>
                                </DropArea>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div>
                {/* Navigation links */}
                <Link to="/profile" text="Profile" /> {/* Link to Profile page */}
                <Link to="/view-planner" text="View Planner" /> {/* Link to View Planner page */}
                <Link to="/logout" text="Logout" /> {/* Link to Logout page */}
                <Link to="/help" text="Help" /> {/* Link to Help page */}
                <Link to="https://askuon.newcastle.edu.au/" text="Ask Uon" external /> {/* External link to Ask Uon */}
                <Link to="/completed" text="Completed" /> {/* Link to Completed page */}
                <Link to="/generate-plan" text="Generate Plan" /> {/* Link to Generate Plan page */}
                <Link to="/select" text="Create new planner"/>{/* Link to Select page */}
            </div>
        </div>
    );
};

export default GeneratePlan; // Exporting the GeneratePlan component as the default export










