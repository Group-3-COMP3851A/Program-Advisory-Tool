import React, { useEffect, useState, useContext } from 'react'; // Importing React library
import '../styles/style.css';
import Menu from '../components/Menu'; // Importing the Menu component
import Text from '../components/Text'; // Importing the Text component
import Button from '../components/Button'; // Importing the Button component
import { useNavigate, useLocation } from 'react-router-dom'; // Importing the useNavigate hook from react-router-dom
import { AppContext } from '../AppContext';
import Tooltip from '../components/Tooltip';

// Will probably have to create another card component
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Completed = () => {
    const location = useLocation();
    const { degree, major, semCount, coursesPerSem } = location.state || {};
    const { completedCourses, setCompletedCourses } = useContext(AppContext);
    const [courseList, setCourseList] = useState([]);
    const navigate = useNavigate(); // Initializing the useNavigate hook for navigation
    
    useEffect(() => {
        getFullCourseList(degree, major);
        //console.log(courseList);
    }, [ degree, major ]);
    
    const getFullCourseList = (degree, major) =>{
        fetch('http://localhost:3001/api/course/getFullCourseList', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
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
    };

    const handleCourseSelect = (course) => {
        if (completedCourses.find(c => c._id === course._id)) {
            setCompletedCourses(completedCourses.filter(c => c._id !== course._id));
        } else {
            setCompletedCourses([...completedCourses, course]);
        }
    }

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
        default:
          fullName = courseId;
      }
    
      return fullName + courseName;
    }

    const handleNext = () => {
        navigate('/plan', { state: { degree, major, semCount, coursesPerSem, completedCourses } }); // Function to navigate to the "Generate Plan" page when the button is clicked
    };

    return (
		<div className='global'>
      <Menu curentPage="select"/>
			<div className='main-section'>
        {/* Centered content container */}
        <Text type="h1">Completed Courses</Text> {/* Heading for the Completed Courses page */}
        <Text type="h2">Great! It looks like you have completed some courses before.</Text> {/* Subheading indicating course completion */}
        <Text type="p">Based on your input, we will proceed with setting up your program. If you have any specific details or requirements, please let us know.</Text> {/* Additional instructions or information */}
          <div style={{  flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '0.5%', width: '95%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '%', width: '100%' }}>
                <div style={{  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'left', margin: '0%', width: '100%' }}>
                  <Text type="h3">All Courses:</Text>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2%', width: '95%' }}>
                  <Box sx = {{
                      width: '100%', // Making the drop area take up the full width of its parent container
                      border: '1px solid #ccc', // Adding a solid border with a light gray color around the drop area
                      borderRadius: '4px', // Rounding the corners of the drop area
                      padding: '16px', // Adding padding inside the drop area to create space between the border and the content
                      flex: 1, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center'
                  }}>
                    {courseList.map(course => (
                        <div key={course._id} onClick={() => handleCourseSelect(course)} style={{cursor: 'pointer', margin: '1%', width: '100%'}}>
                          <CardActionArea>
                            <CardContent sx={{textAlign: 'center', backgroundColor: 'lightgray', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                              <Typography gutterBottom variant="h5" component="div" sx={{color: '#0F82E4', fontWeight: 'bold' }}>
                                {getFullCourseCode(course._id)}
                              </Typography>
                              <Typography gutterBottom variant="h6" sx={{ color: 'text.secondary', fontSize: '1rem'}}>
                                {course.course_name}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </div>
                    ))}
                  </Box>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1%', width: '100%' }}>
                <div style={{  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'left', margin: '0%', width: '100%'}}>
                  <Text type="h3">Completed Courses:</Text>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2%', width: '95%'}}>
                  <Box sx = {{
                      width: '100%', // Making the drop area take up the full width of its parent container
                      border: '1px solid #ccc', // Adding a solid border with a light gray color around the drop area
                      borderRadius: '4px', // Rounding the corners of the drop area
                      padding: '16px', // Adding padding inside the drop area to create space between the border and the content
                      flex: 1, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center'
                  }}>
                    {completedCourses.map(course => (
                        <div key={course._id} style={{margin: '1%', width: '100%'}}>
                          <CardActionArea>
                            <CardContent sx={{textAlign: 'center', backgroundColor: 'lightgray', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                              <Typography gutterBottom variant="h5" component="div" sx={{color: '#0F82E4', fontWeight: 'bold' }}>
                                {getFullCourseCode(course._id)}
                              </Typography>
                              <Typography gutterBottom variant="h6" sx={{ color: 'text.secondary', fontSize: '1rem'}}>
                                {course.course_name}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </div>
                    ))}
                  </Box>
                </div>
            </div>
          </div>
        <Button onClick={handleNext} text="Continue" /> {/* Button to continue to the next step, triggers handleNext function */}
		<Tooltip text1="Select every course you have already completed, if you accidentally select a course, click on it again"/>
      </div>
    </div>
    );
};

export default Completed; // Exporting the Completed component as the default export

