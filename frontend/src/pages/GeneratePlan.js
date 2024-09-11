import React, { useState, useEffect } from 'react'; // Importing React, useState, and useEffect hooks
import '../styles/style.css';
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
        
    }, [coursesPerSem, degree, major, semCount]);

    // console.log(courseList);
    const handleEditClick = () => {
        // Function to handle the "Edit" button click
        navigate('/view-planner'); // Navigate to the "View Planner" page
    };

    return (
		<div className='global'>
            <Menu curentPage="select"/>
			<div className='main-section'>
                {/* Main content container */}
                <Text type="h1" style={{ marginBottom: '1%'}}>Course Plan for {major} Major</Text> {/* Page heading */}
                <Button onClick={handleEditClick} text="Edit" color="#007bff" /> {/* Edit button, triggers handleEditClick function */}
                {Object.keys(courseList).map((year, yearIndex) => (
                    // Iterate over each year in groupedCards
                    <div key={yearIndex} style={{  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0.5%', width: '95%' }}>
                        <div style={{  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'left', margin: '0%', width: '100%' }}>
                            <Text type="h2" style={{ margin: '0.5%' }}>Year {yearIndex + 1}</Text> {/* Display the year */}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '0%', width: '100%' }}>
                            <DropArea>
                                {Object.keys(courseList[yearIndex]).map((semester, semesterIndex) => (
                                    // Iterate over each semester in the year
                                    <div key={semesterIndex} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2%' }}>
                                        <div style={{  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'left', margin: '0%', width: '100%' }}>
                                            <Text type="h3" style={{ margin: '0.5%' }}>Semester {semesterIndex + 1}</Text> {/* Display the semester */}
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '0%', width: '100%' }}>
                                            <DropArea>
                                                {/* DropArea component to hold the course cards */}
                                                {courseList[yearIndex][semesterIndex].map((course, i) => (
                                                    // Iterate over each course in the semester and display a Card component
                                                    <OutlinedCard key={course._id + i.toString()} text={course}/> 
                                                ))}
                                            </DropArea>
                                        </div>
                                    </div>
                                ))}
                            </DropArea>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GeneratePlan; // Exporting the GeneratePlan component as the default export










