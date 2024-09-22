import React, { useEffect, useState, useContext } from 'react'; 
import '../styles/style.css';
import Menu from '../components/Menu'; 
import Button from '../components/Button'; 
import { useNavigate, useLocation } from 'react-router-dom'; 
import { AppContext } from '../AppContext';
import Tooltip from '../components/Tooltip';
import SearchBox from '../components/SearchBox'; 
const Completed = () => {
    const location = useLocation();
    const { degree, major, semCount, coursesPerSem } = location.state || {};
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

    const handleCourseSelect = (selectedCourses) => {
        setCompletedCourses(selectedCourses); 
    };


    const handleNext = () => {
        navigate('/plan', { state: { degree, major, semCount, coursesPerSem, completedCourses } });
    };

    return (
        <div className='global'>
            <Menu curentPage="select"/>
            <div className='completed-section'>
                            <SearchBox 
                                    options={courseList} 
                                    value={completedCourses} 
                                    onChange={handleCourseSelect} 
                             />
                <div className='CIcon'><Button onClick={handleNext} text="Continue" /></div>
                <Tooltip text1="Select every course you have already completed, if you accidentally select a course, click on it again"/>
            </div>
        </div>
    );
};

export default Completed;
