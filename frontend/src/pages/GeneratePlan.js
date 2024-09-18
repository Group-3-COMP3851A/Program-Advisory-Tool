import React, { useState, useEffect } from 'react';
import '../styles/style.css';
import { OutlinedCard } from '../components/Card';
import DropArea from '../components/DropArea';
import Text from '../components/Text';
import Button from '../components/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { defaultDropAnimation, defaultDropAnimationSideEffects, DndContext, DragOverlay } from '@dnd-kit/core';
import { Box } from '@mui/material';
import { CardWrapper } from '../components/CardWrapper';

const GeneratePlan = () => {
    const location = useLocation();
    const { degree, major, semCount, coursesPerSem, completedCourses } = location.state || {};
    const [courseList, setCourseList] = useState([]);
    const navigate = useNavigate();
    const [activeId, setActiveId] = useState(null);

    const getCourseList = (degree, major, semCount, coursesPerSem, completedCourses) => {
        fetch('http://localhost:3001/api/algorithm/getCourseList', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                studentId: 12345,
                degree,
                major,
                semCount,
                coursesPerSem,
                completedCourses
            }),
        })
        .then(response => response.json())
        .then(data => setCourseList(data.courseList || []))
        .catch((error) => console.error('Error:', error));
    }

    useEffect(() => {
        getCourseList(degree, major, semCount, coursesPerSem, completedCourses);
    }, [degree, major, semCount, coursesPerSem, completedCourses]);

    const findCourse = (courseId) => {
        for (let yearIndex = 0; yearIndex < courseList.length; yearIndex++) {
            for (let semesterIndex = 0; semesterIndex < courseList[yearIndex].length; semesterIndex++) {
                const course = courseList[yearIndex][semesterIndex].find(c => c._id === courseId);
                if (course) {
                    return { yearIndex, semesterIndex, course };
                }
            }
        }
        return null;
    };

    const handleDragStart = (event) => {
        const { active } = event;
        const course = findCourse(active.id);
        if (course) {
            setActiveId(course);
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const sourceCourse = findCourse(active.id);
            const destinationCourse = findCourse(over?.id);

            if (sourceCourse && destinationCourse) {
                const { yearIndex: sourceYear, semesterIndex: sourceSemester, course } = sourceCourse;
                const { yearIndex: destYear, semesterIndex: destSemester } = destinationCourse;

                // Move course from source to destination
                const updatedCourseList = [...courseList];
                updatedCourseList[sourceYear][sourceSemester] = updatedCourseList[sourceYear][sourceSemester].filter(c => c._id !== active.id);
                updatedCourseList[destYear][destSemester].push(course);

                setCourseList(updatedCourseList);
            }
        }
        setActiveId(null);
    };


    return (
        <div className='global'>
            <div className='gen-section'>
                <Text type="h1" style={{ marginBottom: '1%' }}>Course Plan for {major} Major</Text>
                <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    {courseList.map((year, yearIndex) => (
                        <div key={yearIndex} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0.5%', width: '95%' }}>
                            <Text type="h2" style={{ margin: '0.5%' }}>Year {yearIndex + 1}</Text>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '0%', width: '100%' }}>
                                {year.map((semester, semesterIndex) => (
                                    <div key={semesterIndex} className='semester-section'>
                                        <DropArea items={semester} semesterIndex={semesterIndex}>
                                            <Box sx={{
                                                minHeight: '200px',
                                                width: '100%',
                                                border: '1px solid #ccc',
                                                borderRadius: '4px',
                                                padding: '16px',
                                                flex: 1,
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }}>
                                                {semester.map((course) => (
                                                    <CardWrapper key={course._id ? course._id : course.code + semesterIndex} id={course._id ? course._id : course.code + semesterIndex}>
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
                                                        active: { opacity: '1' }
                                                    }
                                                })
                                            }}
                                        >
                                            {activeId ? <OutlinedCard text={activeId.course} /> : null}
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

export default GeneratePlan;
