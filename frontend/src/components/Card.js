import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { AppContext } from '../AppContext';

export const OutlinedCard = ({text, ...props}) => {

  const [directedCourseList, setDirectedCourseList] = useState([]);

  let { major, coursesPerSem, completedCourses } = useContext(AppContext);
  if (!major) {
    major = localStorage.getItem('major');
  } else localStorage.setItem('major', major);

  if (!coursesPerSem) {
    coursesPerSem = localStorage.getItem('coursesPerSem');
  } else localStorage.setItem('coursesPerSem', coursesPerSem);

  if (!completedCourses) {
    completedCourses = localStorage.getItem('completedCourses');
  } else localStorage.setItem('completedCourses', completedCourses);


  const getDirectedCourseFromSemester = (major, semester, completedCourses) =>{
    fetch('http://localhost:3001/api/course/getDirectedListFromSemester', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        major,  
        semester,
        completedCourses
      }),
      })
      .then(response => response.json())
      .then(data => {
        //console.log(data.courseList);
        setDirectedCourseList(data.courseList || []);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  // This might not be the best way to do this, but it works, for the time being
  switch (text.code) {
    case "elective":
      return (
        <Card className="card-container">
          <CardActionArea>
            <CardContent className="card-content">
              <Typography className="card-title" variant="h5">
                Elective
              </Typography>
              <Typography className="card-subtitle" variant="h6">
                Units: 10
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
    
    case "directed":
      return (
        <Card className="card-container">
          <CardActionArea>
            <CardContent className="card-content directed-course">
              <Typography className="card-title small-title" variant="h5">
                Directed Course
              </Typography>
              <Typography className="card-subtitle small-title" variant="h6">
                Units: 10
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );

    case "completed":
      return (
        <Card className="card-container">
          <CardActionArea>
            <CardContent className="card-content">
              <Typography className="card-title" variant="h5">
                Completed Course
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );

    default:
      return (
        <Card className="card-container">
          <CardActionArea>
            <CardContent className="card-content">
              <Typography
                className="card-link underline-title"
                variant="h5"
                onClick={() => window.open(getCourseURL(text._id), "_blank", 'noopener,noreferrer')}
              >
                {getFullCourseCode(text._id)}
              </Typography>
              <Typography className="card-subtitle" variant="h6">
                {text.course_name}
              </Typography>
              <Typography className="card-subtitle" variant="h6">
                Units: {text.credits}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
  }
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
    default:
      fullName = courseId;
  }

  return fullName + courseName;
}

function getCourseURL(courseId)
{
  let courseCode = getFullCourseCode(courseId);

  return "https://www.newcastle.edu.au/course/" + courseCode;
}









