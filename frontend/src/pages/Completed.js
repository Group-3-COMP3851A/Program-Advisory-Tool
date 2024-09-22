import React, { useEffect, useState, useContext } from 'react'; 
import '../styles/style.css';
import Menu from '../components/Menu'; 
import Text from '../components/Text'; 
import Button from '../components/Button'; 
import { useNavigate, useLocation } from 'react-router-dom'; 
import { AppContext } from '../AppContext';
import Tooltip from '../components/Tooltip';
import SearchBox from '../components/SearchBox'; // Import the SearchBox component
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
        setCompletedCourses(selectedCourses); // Update completed courses with new selection
    };

    function getFullCourseCode(internalId) {
        let courseString = String(internalId);
        let courseId = courseString.slice(-2);
        let courseName = courseString.slice(0, -2);
        let fullName = "";

        switch(courseId) {
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
            default:
                fullName = courseId;
        }

        return fullName + courseName;
    }

    const handleNext = () => {
        navigate('/plan', { state: { degree, major, semCount, coursesPerSem, completedCourses } });
    };

    return (
        <div className='global'>
            <Menu curentPage="select"/>
            <div className='main-section'>
                <Text type="h1">Completed Courses</Text>
                <Text type="h2">Great! It looks like you have completed some courses before.</Text>
                <Text type="p">Based on your input, we will proceed with setting up your program. If you have any specific details or requirements, please let us know.</Text>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '0.5%', width: '95%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '%', width: '100%' }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'left', margin: '0%', width: '100%' }}>
                            <Text type="h3">All Courses:</Text>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2%', width: '95%' }}>
                            <Box sx={{
                                width: '100%',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                padding: '16px',
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <SearchBox 
                                    options={courseList} 
                                    value={completedCourses} 
                                    onChange={handleCourseSelect} 
                                />
                            </Box>
                        </div>
                    </div>
                </div>
                <Button onClick={handleNext} text="Continue" />
                <Tooltip text1="Select every course you have already completed, if you accidentally select a course, click on it again"/>
            </div>
        </div>
    );
};

export default Completed;
