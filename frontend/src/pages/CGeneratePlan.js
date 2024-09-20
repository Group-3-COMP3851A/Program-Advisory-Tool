import React, { useState, useEffect } from 'react'; // Importing React, useState, and useEffect hooks
import '../styles/style.css'; // Make sure your new CSS is imported here
import { OutlinedCard } from '../components/Card'; // Importing the Card component
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
                setCourseList(data.courseList || []);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    useEffect(() => {
        getCourseList(degree, major, semCount, coursesPerSem, completedCourses);
    }, [degree, major, semCount, coursesPerSem, completedCourses]);

    // Function to find the course being dragged by ID
    const handleDragStart = (event) => {
        const { active } = event;
        let index, found = false;
        for (let i = 0; i < courseList.length && !found; i++) {
            const year = courseList[i];
            for (let j = 0; j < year.length && !found; j++) {
                const semester = year[j];
                for (let k = 0; k < semester.length && !found; k++) {
                    const course = semester[k];
                    if (course.code && course.code === active.id.substring(0, active.id.length - 1)) {
                        index = [i, j, k];
                        found = true;
                    }
                    if (course._id === active.id) {
                        index = [i, j, k];
                        found = true;
                    }
                }
            }
        }
        console.log(index);
        setActiveId(index);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        console.log(over);
        setActiveId(null);
    };

    const handleEditClick = () => {
        navigate('/view-planner'); // Navigate to the "View Planner" page
    };

    return (
        
            <div>
                <Text type="h1">Course Plan for {major} Major</Text>
                <Button onClick={handleEditClick} text="Edit" color="#007bff" />
                <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    {Object.keys(courseList).map((year, yearIndex) => (
                        <div key={yearIndex} className='year-section'>
                            <Text type="h2">Year {yearIndex + 1}</Text>
                            <div className='semester'>
                                {Object.keys(courseList[yearIndex]).map((semester, semesterIndex) => (
                                    <div key={semesterIndex} className='semester-section'>
                                        <DropArea items={courseList[yearIndex][semesterIndex]} semesterIndex={semesterIndex}>
                                            <Box className='drop-area'>
                                                {courseList[yearIndex][semesterIndex].map((course, i) => (
                                                    <CardWrapper key={course._id ? course._id : course.code + semesterIndex.toString()} id={course._id ? course._id : course.code + semesterIndex.toString()}>
                                                        <OutlinedCard text={course} />
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
                                            {activeId ? <OutlinedCard text={courseList[activeId[0]][activeId[1]][activeId[2]]} /> : null}
                                        </DragOverlay>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </DndContext>
            </div>
        
    );
};

export default GeneratePlan;
