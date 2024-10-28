import React, { useState, useEffect, useContext } from 'react';
import '../styles/style.css'; 
import { OutlinedCard } from '../components/Card';
import DropArea from '../components/DropArea';
import Text from '../components/Text';
import { useLocation } from 'react-router-dom';
import { defaultDropAnimation, defaultDropAnimationSideEffects, DndContext, DragOverlay } from '@dnd-kit/core';
import { Alert, Box, Collapse } from '@mui/material';
import { CardWrapper } from '../components/CardWrapper';
import HelpIcon from '../components/Tooltip';
import Button from '../components/Button';
import { arrayMove } from '@dnd-kit/sortable';
import { AppContext } from '../AppContext';
import PopUp from '../components/PopUp';

const Plan = () => {
    const location = useLocation();
    const { studentId } = useContext(AppContext);
    const { degree, major, coursesPerSem, completedCourses, courseMap } = location.state || {};
    const [courseList, setCourseList] = useState(courseMap || []);
    const [activeId, setActiveId] = useState(null);
    const [dndDisabled, setDndDisabled] = useState(true);
    const [semesterFull, setSemesterFull] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [planName, setPlanName] = useState('');

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
        if (!courseMap){
            getCourseList(degree, major, coursesPerSem, completedCourses);
        }
        setErrorMessage('');
    }, [degree, major, coursesPerSem, completedCourses, courseMap]);

    const findCourse = (courseId) => {
        if (!courseId) {
            console.error("courseId is undefined or null");
            return null;
        }
        if (courseId.substring(0, courseId.length-2) === "PLACEHOLDER_KEY") {
            return {yearIndex: parseInt(courseId.substring(courseId.length-2, courseId.length-1)), semesterIndex: parseInt(courseId.substring(courseId.length-1))};
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
            
            
            if (sourceCourse && destinationCourse) {
                const transition = { sourceCourse, destinationCourse };
                if (courseList[destinationCourse.yearIndex][destinationCourse.semesterIndex].length === 5) {
                    setSemesterFull(true);
                    setActiveId(null);
                    return;
                }
                console.log(transition);
                if (sourceCourse.yearIndex === destinationCourse.yearIndex && sourceCourse.semesterIndex === destinationCourse.semesterIndex) {
                    const updatedCourseList = [...courseList];
                    const { yearIndex, semesterIndex } = sourceCourse;
                    updatedCourseList[yearIndex][semesterIndex] = arrayMove(updatedCourseList[yearIndex][semesterIndex], updatedCourseList[yearIndex][semesterIndex].indexOf(sourceCourse.course), updatedCourseList[yearIndex][semesterIndex].indexOf(destinationCourse.course));
                    setCourseList(updatedCourseList);
                    setActiveId(null);
                    return
                }
                const { yearIndex: sourceYear, semesterIndex: sourceSemester, course } = sourceCourse;
                const { yearIndex: destYear, semesterIndex: destSemester } = destinationCourse;
    
                // Update the course list
                const updatedCourseList = [...courseList];
                if (course._id) updatedCourseList[sourceYear][sourceSemester] = updatedCourseList[sourceYear][sourceSemester].filter(c => c._id !== course._id);
                else updatedCourseList[sourceYear][sourceSemester] = updatedCourseList[sourceYear][sourceSemester].filter(c => c.code+c.number !== course.code+course.number);
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

    const setDirectedCourse = (directedCourse, course) => {
        const { yearIndex, semesterIndex } = findCourse(directedCourse.code+directedCourse.number);
        const updatedCourseList = [...courseList];
        updatedCourseList[yearIndex][semesterIndex][courseList[yearIndex][semesterIndex].findIndex((c) => c.code+c.number === directedCourse.code+directedCourse.number)] = course; //find the location of the directed and put it into the list
        if (course._id){
            const courseLocation = findCourse(course._id);
            fetch('http://localhost:3001/api/feasibility/checkDirectedFeasibility', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studentId: 12345,
                    degree,
                    major,
                    completedCourses,
                    course: courseLocation,
                    schedule: updatedCourseList
                }),
            })
            .then(response => response.json())
            .then(data => setCourseList(data.courseList || []))
            .catch((error) => console.error('Error:', error));
        }
        setCourseList(updatedCourseList);
    }

    // TODO: Clean up this function a little bit
    const savePlan = async (studentId, degree, major, courseMap, planName) => {
        try {
          const response = await fetch('http://localhost:3001/api/student/addPlanToUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                studentId, 
                planName,
                degree,
                major,
                courseMap,
            }),
          });
          const data = await response.json();

          if (response.ok) {
            setIsPopupVisible(false);
            return data;
          }else{
            setErrorMessage(data.error);
          }

        } catch (error) {
          setErrorMessage('An error occurred. Please try again.');
        }
    }

    return (
        <div className='global'>
			<HelpIcon text1="To adjust your plan, press the 'edit plan' button and drag courses into another semester."
				text2="If any course cards have a red information icon, you might be doing courses in the wrong order."/>
            <div className='gen-section'>
                <Text type="h1" className='page-title'>This program plan is for a student in the {degree} with a major in {major}. Completed courses are not shown in the plan.</Text>
                <div><Text type="h2" className='S1'>Each box represents a semester. Clicking on a course name will reveal information about the course. By hovering over the information icon, any conflicts that may not allow you to complete the course can be shown</Text></div>
                <div><Text type="h2" className='S1'>The plan can be edited by clicking on the "Edit Plan" button and stopped by clicking on the "Stop Editing" button. You can select directed courses by clicking on the Directed Course text and selecting from the list of available courses.</Text></div>
                <div className="popup-buttons">
                    <Button onClick={() => setDndDisabled(!dndDisabled)} text={dndDisabled ? "Edit Plan" : "Stop Editing"} color="#28a745"/>
                    <Button onClick={() => setIsPopupVisible(true)} text={"Save Plan"} color="#28a745"/>
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
                                                        <OutlinedCard text={course} semesterIndex={semesterIndex} setDirected = {setDirectedCourse}/>
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
                <Collapse in={semesterFull}
                    timeout={{enter: 1000, exit: 1000}}
                    addEndListener={() => {
                        setTimeout(() => setSemesterFull(false), 3000);
                    }}
                >
                    <Alert
                        severity='error'
                        sx={{position: "fixed", bottom: "10px", left: "15%", zIndex: "100222", width: '80%'}}                          
                    >
                        Taking more than 5 courses per semester is not possible
                    </Alert>
                </Collapse>
            </div>
            {isPopupVisible && (
                <PopUp
                    message="Enter a name for your plan:"
                    options={null}
                    value={planName}
                    onClose={() => setIsPopupVisible(false)}
                    onConfirmYes={() => {
                        savePlan(studentId, degree, major, courseList, planName);
                        setErrorMessage('');
                    }}
                    onConfirmNo={() => {
                        setIsPopupVisible(false);
                        setErrorMessage('');
                    }}
                    onOptionSelect={(e) => setPlanName(e.target.value)}
                    isSavePlan={true}
                    errorMessage={errorMessage}
                />
            )}
        </div>
    );
};

export default Plan;
