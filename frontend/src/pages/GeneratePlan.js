import React, { useState, useEffect } from 'react'; // Importing React, useState, and useEffect hooks
import '../styles/style.css';
import {OutlinedCard} from '../components/Card'; // Importing the Card component
import DropArea from '../components/DropArea'; // Importing the DropArea component
import Text from '../components/Text'; // Importing the Text component
import Button from '../components/Button'; // Importing the Button component
import { useNavigate, useLocation } from 'react-router-dom'; // Importing the useNavigate hook from react-router-dom
import Link from '../components/Link'; // Importing the Link component
import { defaultDropAnimation, defaultDropAnimationSideEffects, DndContext, DragOverlay } from '@dnd-kit/core';
import { Box } from '@mui/material';
import { CardWrapper } from '../components/CardWrapper';

const GeneratePlan = () => {
    const location = useLocation();
    const { degree, major, semCount, coursesPerSem, completedCourses } = location.state || {};
    const [courseList, setCourseList] = useState([]);
    const navigate = useNavigate(); // Initializing the useNavigate hook for navigation
    const [activeId, setActiveId] = useState(null); //active drag item

    const getCourseList = (degree, major, semCount, coursesPerSem, completedCourses) => {
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
            coursesPerSem,
            completedCourses
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
        getCourseList(degree, major, semCount, coursesPerSem, completedCourses);
        
    }, [degree, major, semCount, coursesPerSem, completedCourses]);

    //TODO: Implement an efficient way to find the course that is being dragged given the ID of it
        //just need to loop through the courseList array and find the course with the ID
    const handleDragStart = (event) => {
        const {active} = event;
        let index, found = false;
        for (let i = 0; i < courseList.length && !found; i++) {
            const year = courseList[i];
            for (let j = 0; j < year.length && !found; j++) {
                const semester = year[j];
                for (let k = 0; k < semester.length && !found; k++) {
                    const course = semester[k];
                    if (course.code && course.code === active.id.substring(0, active.id.length-1)) {
                        index = [i, j, k];
                        found = true;
                    }
                    if (course._id === active.id) {
                        index = [i, j, k];
                        found = true;
                    }
                }
            }
        };
        console.log(index);
        setActiveId(index);
    }
    
    const handleDragEnd = (event) => {
        const {active, over} = event;
        console.log(over)
        setActiveId(null);
    }

    // console.log(courseList);
    const handleEditClick = () => {
        // Function to handle the "Edit" button click
        navigate('/view-planner'); // Navigate to the "View Planner" page
    };

    return (
        <div className='global'>
      
            <div className='gen-section'>
                {/* Main content container */}
                <Text type="h1" style={{ marginBottom: '1%'}}>Course Plan for {major} Major</Text> {/* Page heading */}
                <Button onClick={handleEditClick} text="Edit" color="#007bff" /> {/* Edit button, triggers handleEditClick function */}
                <DndContext
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                            >
                {Object.keys(courseList).map((year, yearIndex) => (
                    // Iterate over each year in groupedCards
                    <div key={yearIndex} style={{  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0.5%', width: '95%' }}>
                        <div style={{  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'left', margin: '0%', width: '100%' }}>
                            <Text type="h2" style={{ margin: '0.5%'}}>Year {yearIndex + 1}</Text> {/* Display the year */}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '0%', width: '100%' }}>
                                {Object.keys(courseList[yearIndex]).map((semester, semesterIndex) => (
                                    // Iterate over each semester in the year
                                    //each semester should be it's own sortableContext with items value equal to the courses that are in the semester.
                                    //use rectswappingstrategy since it seems to be able to shuffle courses along - this may not work as intended due to the fact we are swapping containers
                                    //potentially just show some kind of highligh on the card that is going to be swapped
                                    <div key={semesterIndex} className='semester-section' >
                                        <DropArea items={courseList[yearIndex][semesterIndex]} semesterIndex={semesterIndex}>
                                            <Box sx = {{
                                                minHeight: '200px', // Setting a minimum height for the drop area to ensure it occupies sufficient space
                                                width: '100%', // Making the drop area take up the full width of its parent container
                                                border: '1px solid #ccc', // Adding a solid border with a light gray color around the drop area
                                                borderRadius: '4px', // Rounding the corners of the drop area
                                                padding: '16px', // Adding padding inside the drop area to create space between the border and the content
                                                flex: 1, 
                                                display: 'flex', 
                                                flexDirection: 'row', 
                                                alignItems: 'center'
                                            }}>
                                                {/* DropArea component to hold the course cards */}
                                                {courseList[yearIndex][semesterIndex].map((course, i) => (
                                                    // Iterate over each course in the semester and display a Card component
                                                    //TODO: make the directed and elective IDs more unique (semester + course index)
                                                    <CardWrapper key={course._id ? course._id : course.code + semesterIndex.toString()} id={course._id ? course._id : course.code + semesterIndex.toString()} >
                                                        <OutlinedCard text={course}/> 
                                                    </CardWrapper>
                                                ))}
                                            </Box>
                                        </DropArea>
                                        <DragOverlay
                                            dropAnimation={{
                                                ...defaultDropAnimation,
                                                sideEffects: defaultDropAnimationSideEffects({
                                                    styles: {
                                                        active: {
                                                            opacity: '1',
                                                        },
                                                    },
                                                }),
                                            }}
                                        >
                                            {activeId ? <OutlinedCard text={courseList[activeId[0]][activeId[1]][activeId[2]]}/> : null}
                                        </DragOverlay>
                                    </div>
                                ))}
                        </div>
                    </div>
                    
                ))}
                </DndContext>
            </div>
        </div>
    );
};

export default GeneratePlan; // Exporting the GeneratePlan component as the default export










