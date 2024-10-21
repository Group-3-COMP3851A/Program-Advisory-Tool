// edited by Muhammad 12/10/24: add some funtions like adding selected courses in the group box and HTML&JSX for the structure and design like field tags for grouping and making it fit with the figma. also put the value as empty array so the courses won't stay within the search field after select
// edited by Muhammad 13/10/24: add the function for course code.
import React, { useEffect, useState, useContext } from 'react'; 
import '../styles/style.css';
import Menu from '../components/Menu'; 
import Button from '../components/Button'; 
import { useNavigate, useLocation } from 'react-router-dom'; 
import { AppContext } from '../AppContext';
import Tooltip from '../components/Tooltip';
import MultiSearchBox from '../components/SearchBox';
import { Box } from '@mui/material';

const Completed = () => {
    const location = useLocation();
    const { degree, major, coursesPerSem } = location.state || {};
    const { completedCourses, setCompletedCourses } = useContext(AppContext);
    const [courseList, setCourseList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getFullCourseList(degree, major);
    }, [degree, major]);

    const getFullCourseList = (degree, major) => {
        fetch('http://localhost:3001/api/course/getFullCourseList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ degree, major }),
        })
        .then(response => response.json())
        .then(data => {
            setCourseList(data.courseList || []);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

function getFullCourseCode(internalId)
{
  let courseString = String(internalId);
  let courseId = courseString.slice(-2);
  let courseName = courseString.slice(0, -2);
  let fullName = "";

    switch(courseId)
    {
        // We can add extra cases if extra courses are added to the database
        case "co":
        fullName = "COMP";
        break;
        case "se":
        fullName = "SENG";
        break;
        case "ma":
        fullName = "MATH";
        break;
        case "in":
        fullName = "INFT";
        break;
        case "el":
        fullName = "ELEC";
        break;
        case "st":
        fullName = "STAT";
        break;
        case "le":
        fullName = "LEGL";
        break;
        case "mk":
        fullName = "MKTG";
        break;
        case "mn":
        fullName = "MNGT";
        break;
        case "ac":
        fullName = "ACFI";
        break;
        case "sc":
        fullName = "SCIE";
        break;
        case "eb":
        fullName = "EBUS";
        break;
        default:
        fullName = courseId;
    }

    return fullName + courseName;
    }

  const handleCourseSelect = (selectedCourses) => {
        // Ensure the selection is an array, whether it's a single course or multiple
        let newSelectedCourses = Array.isArray(selectedCourses) ? selectedCourses : [selectedCourses];

        // Add courses that aren't already in the completedCourses array
        const updatedCompletedCourses = newSelectedCourses.reduce((acc, course) => {
            if (!acc.some(c => c._id === course._id)) {
                acc.push(course);
            }
            return acc;
        }, [...completedCourses]);

        // Update state with the newly selected courses
        setCompletedCourses(updatedCompletedCourses);
    };

    const handleRemoveCourse = (course) => {
        setCompletedCourses(completedCourses.filter(c => c._id !== course._id));
    };

    const handleNext = () => {
        navigate('/plan', { state: { degree, major, coursesPerSem, completedCourses } });
    };

    return (
        <div className='global'>
            <Tooltip text1="Select every course you have already completed, these courses will be ignored when creating your degree plan"/>		
            <div className='completed-section'>
                {/* Search Box at the Top */}
                <h3>ADD COMPLETED COURSES</h3>
               
                    <MultiSearchBox options={courseList} value={[]} onChange={handleCourseSelect}/>
               
                {/* Display Selected Courses as Cards */}
             <fieldset className='cm-g1'>
                    <legend>Completed Courses</legend>
                    <div className='selected-courses scrollable'>
                        {completedCourses.map((course) => (
                            <div key={course._id} className='selected-course-item'>
                                <ul className='cm-ul'>
                                    <li className='course-row'>
                                        <div className='course-id'>
                                            <span> {getFullCourseCode(course._id)}</span>
                                        </div>
                                        <span className='course-name'>{course.course_name}</span>
                                        <div className='course-details'>
                                            <span className='course-units'>{course.credits} Units</span>
                                            <button className='remove-btn' onClick={() => handleRemoveCourse(course)}>✕</button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </fieldset>

                {/* Continue Button */}
                <div className='CIcon'>
                    <Button onClick={handleNext}  text="Continue" />
                </div>
            </div>
        </div>
    );
};

export default Completed;
