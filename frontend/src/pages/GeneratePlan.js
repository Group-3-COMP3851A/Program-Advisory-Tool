import React, { useState, useEffect } from 'react'; // Importing React, useState, and useEffect hooks
import Card from '../components/Card'; // Importing the Card component
import DropArea from '../components/DropArea'; // Importing the DropArea component
import Text from '../components/Text'; // Importing the Text component
import Menu from '../components/Menu'; // Importing the Menu component
import Button from '../components/Button'; // Importing the Button component
import { useNavigate, useLocation } from 'react-router-dom'; // Importing the useNavigate hook from react-router-dom
import Link from '../components/Link'; // Importing the Link component

const GeneratePlan = () => {
    const location = useLocation();
    const { degree, major } = location.state || {};
    const [courseList, setCourseList] = useState([]);
    const [cards, setCards] = useState([]); // State to hold the list of course cards
    const navigate = useNavigate(); // Initializing the useNavigate hook for navigation

    const getCourseList = (degree, major) => {
        fetch('http://localhost:3001/api/algorithm/getCourseList', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studentId: 12345, // static until we add login functionality to the frontend
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

    useEffect(() => {
        // Simulate an API call with test data for courses
        const testData = [
            { _id: '1', course_name: 'Course 1' }, // Mock course data for year 1, semester 1
            { _id: '2', course_name: 'Course 2' }, // Mock course data for year 1, semester 2
            { _id: '3', course_name: 'Course 3' }  // Mock course data for year 2, semester 1
        ];
        getCourseList(degree, major);
        setCards(testData); // Set the cards state with the test data
    }, []); // Empty dependency array means this effect runs once when the component mounts

    // Grouping the cards by year and semester
    const groupedCards = {
        'Year 1': {
            'Semester 1': cards.filter(course => course._id.startsWith('1')), // Courses for year 1, semester 1
            'Semester 2': cards.filter(course => course._id.startsWith('2')), // Courses for year 1, semester 2
        },
        'Year 2': {
            'Semester 1': cards.filter(course => course._id.startsWith('3')), // Courses for year 2, semester 1
        }
    };

    const handleEditClick = () => {
        // Function to handle the "Edit" button click
        navigate('/view-planner'); // Navigate to the "View Planner" page
    };

    return (
        <div style={{ display: 'flex' }}>
            <Menu /> {/* Menu component */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                {/* Main content container */}
                <Text type="h1" style={{ marginBottom: '20px' }}>Course Plan</Text> {/* Page heading */}
                <Button onClick={handleEditClick} text="Edit" color="#007bff" /> {/* Edit button, triggers handleEditClick function */}
                {Object.keys(groupedCards).map(year => (
                    // Iterate over each year in groupedCards
                    <div key={year} style={{ marginBottom: '20px', width: '100%' }}>
                        <Text type="h2" style={{ marginBottom: '10px' }}>{year}</Text> {/* Display the year */}
                        {Object.keys(groupedCards[year]).map(semester => (
                            // Iterate over each semester in the year
                            <div key={semester} style={{ marginBottom: '20px' }}>
                                <Text type="h3" style={{ marginBottom: '10px' }}>{semester}</Text> {/* Display the semester */}
                                <DropArea>
                                    {/* DropArea component to hold the course cards */}
                                    {groupedCards[year][semester].map((course) => (
                                        // Iterate over each course in the semester and display a Card component
                                        <Card key={course._id} text={course.course_name} /> 
                                    ))}
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










