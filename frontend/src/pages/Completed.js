import React, { useEffect, useState, useContext } from 'react'; // Importing React library
import '../styles/style.css';
import Menu from '../components/Menu'; // Importing the Menu component
import Text from '../components/Text'; // Importing the Text component
import Button from '../components/Button'; // Importing the Button component
import Link from '../components/Link'; // Importing the Link component
import { useNavigate, useLocation } from 'react-router-dom'; // Importing the useNavigate hook from react-router-dom
import { AppContext } from '../AppContext';

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
        navigate('/generate-plan', { state: { degree, major, semCount, coursesPerSem, completedCourses } }); // Function to navigate to the "Generate Plan" page when the button is clicked
    };

    return (
		<div className='global'>
            <Menu curentPage="select"/>
			<div className='main-section'>
                {/* Centered content container */}
                <Text type="h1">Completed Courses</Text> {/* Heading for the Completed Courses page */}
                <Text type="h2">Great! It looks like you have completed some courses before.</Text> {/* Subheading indicating course completion */}
                <Text type="p">Based on your input, we will proceed with setting up your program. If you have any specific details or requirements, please let us know.</Text> {/* Additional instructions or information */}

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <Text type="h3">All Courses:</Text>
                        {courseList.map(course => (
                            <div key={course._id} onClick={() => handleCourseSelect(course)} style={{cursor: 'pointer'}}>
                                {getFullCourseCode(course._id)} - {course.course_name}
                            </div>
                        ))}
                    </div>
                    <div>
                        <Text type="h3">Completed Courses:</Text>
                        {completedCourses.map(course => (
                            <div key={course._id}>
                                {getFullCourseCode(course._id)} - {course.course_name}
                            </div>
                        ))}
                    </div>
                </div>

                <Button onClick={handleNext} text="Continue" /> {/* Button to continue to the next step, triggers handleNext function */}
            </div>
        </div>
    );
};

export default Completed; // Exporting the Completed component as the default export

