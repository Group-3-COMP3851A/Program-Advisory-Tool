import React, { useState, useEffect } from 'react';
import '../styles/style.css'; 
import { OutlinedCard } from '../components/Card';
import DropArea from '../components/DropArea';
import Text from '../components/Text';
import { useLocation } from 'react-router-dom';
import { defaultDropAnimation, defaultDropAnimationSideEffects, DndContext, DragOverlay } from '@dnd-kit/core';
import { Box } from '@mui/material';
import { CardWrapper } from '../components/CardWrapper';
import HelpIcon from '../components/Tooltip';
import Button from '../components/Button';
import { arrayMove } from '@dnd-kit/sortable';

const Plan = () => {
    const location = useLocation();
    const { degree, major, coursesPerSem, completedCourses } = location.state || {};
    const [courseList, setCourseList] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const [dndDisabled, setDndDisabled] = useState(true);

    const getCourseList = (degree, major, coursesPerSem, completedCourses) => {
        fetch('http://localhost:3001/api/algorithm/getCourseList', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                studentId: 12345,
                degree,
                major,
                coursesPerSem,
                completedCourses
            }),
        })
        .then(response => response.json())
        .then(data => setCourseList(data.courseList || []))
        .catch((error) => console.error('Error:', error));
    }

    useEffect(() => {
        getCourseList(degree, major, coursesPerSem, completedCourses);
    }, [degree, major, coursesPerSem, completedCourses]);

    const findCourse = (courseId) => {
        if (!courseId) {
            console.error("courseId is undefined or null");
            return null;
        }
        if (courseId.substring(0, courseId.length-2) === "PLACEHOLDER_KEY") {
            return {yearIndex: courseId.substring(courseId.length-2, courseId.length-1), semesterIndex: courseId.substring(courseId.length-1)};
        }
        for (let yearIndex = 0; yearIndex < courseList.length; yearIndex++) {
            for (let semesterIndex = 0; semesterIndex < courseList[yearIndex].length; semesterIndex++) {
                const course = courseList[yearIndex][semesterIndex].find((c) => c._id === courseId || c.code+c.number === courseId);
                if (course) {
                    //console.log({ yearIndex, semesterIndex, course })
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
            // Find the source and destination courses once
            const sourceCourse = findCourse(active.id);
            const destinationCourse = findCourse(over?.id);
            const transition = { sourceCourse, destinationCourse };
            console.log(transition);
            
            
            if (sourceCourse && destinationCourse) {
                if (sourceCourse.yearIndex === destinationCourse.yearIndex && sourceCourse.semesterIndex === destinationCourse.semesterIndex) {
                    const updatedCourseList = [...courseList];
                    const { yearIndex, semesterIndex } = sourceCourse;
                    updatedCourseList[yearIndex][semesterIndex] = arrayMove(updatedCourseList[yearIndex][semesterIndex], updatedCourseList[yearIndex][semesterIndex].indexOf(sourceCourse.course), updatedCourseList[yearIndex][semesterIndex].indexOf(destinationCourse.course));
                    setCourseList(updatedCourseList);
                    return
                }
                const { yearIndex: sourceYear, semesterIndex: sourceSemester, course } = sourceCourse;
                const { yearIndex: destYear, semesterIndex: destSemester } = destinationCourse;
    
                // Update the course list
                const updatedCourseList = [...courseList];
                updatedCourseList[sourceYear][sourceSemester] = updatedCourseList[sourceYear][sourceSemester].filter(c => c._id !== course._id);
                updatedCourseList[destYear][destSemester].push(course);

                fetch('http://localhost:3001/api/feasibility/checkFeasibility', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        studentId: 12345,
                        degree,
                        major,
                        completedCourses,
                        transition,
                        schedule: updatedCourseList
                    }),
                })
                .then(response => response.json())
                .then(data => setCourseList(data.courseList || []))
                .catch((error) => console.error('Error:', error));
            }
        }
        setActiveId(null);
    };

    return (
        <div className='global'>
			<HelpIcon text1="to swap courses click and drap it to another semester and drop it on the first course in that semester"
				text2="4 Courses is considered full-time study."/>
            <div className='gen-section'>
                <Text type="h1" className='page-title'>This program plan is for an student in the {degree} with a major in {major} modify with any selected completed courses which are placed at the bottom.</Text>
                <div><Text type="h2" className='S1'>Each blue box represents a semester. When you hover your mouse over it, it highlights the courses for that semester. If you hover over a specific course, it will highlight the essential information you need to know.</Text></div>
                <div className="popup-buttons">
                    <Button onClick={() => setDndDisabled(!dndDisabled)} text={dndDisabled ? "Edit Plan" : "Stop Editing"} color="#28a745"/>
                </div>
                <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    {courseList.map((year, yearIndex) => (
                        <div key={yearIndex} className='year-container'>
                            <Text type="h2" className='year-title'>Year {yearIndex + 1}</Text>
                            <div className='semester-container'>
                                {year.map((semester, semesterIndex) => (
                                    <div key={semesterIndex} className='semester-section'>
										<p className='semester-text'>SEMESTER {semesterIndex + 1}</p>
                                            <DropArea items={semester} semesterIndex={semesterIndex}>
                                            <Box className='drop-area'>
                                                {semester.length > 0 ? semester.map((course) => (
                                                    <CardWrapper key={course._id ? course._id : course.code + course.number} id={course._id ? course._id : course.code + course.number} disabled={dndDisabled}>
                                                        <OutlinedCard text={course} editable={dndDisabled} />
                                                    </CardWrapper>
                                                )) : <CardWrapper key={"PLACEHOLDER_KEY" + yearIndex + semesterIndex} id={"PLACEHOLDER_KEY" + yearIndex + semesterIndex} disabled={true}/>}
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

export default Plan;
