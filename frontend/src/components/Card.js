import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AppContext } from '../AppContext';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function OutlinedCard(props) {

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

  let cardStyle = {width: `${100/coursesPerSem}%`, margin: '1%'};

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

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
  switch (props.text.code)
  {
    case "elective":

      return (
        <Card sx={{...cardStyle, ...style}} ref={setNodeRef} {...attributes} {...listeners}>
          <CardActionArea>
            <CardContent sx={{textAlign: 'center', backgroundColor: 'lightgray', height:'150px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <Typography gutterBottom variant="h5" component="div" sx={{color: '#0F82E4', fontWeight: 'bold' }}>
                Elective
              </Typography>
              <Typography gutterBottom variant="h6" sx={{ color: 'text.secondary', fontSize: '0.75rem'}}>
                Units: {10}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );

    case "directed":

      // This keeps looping indefinitely, really need to sort that out
      //getDirectedCourseFromSemester(major, props.text.semester_offered, completedCourses);

      return (
        <Card sx={{...cardStyle, ...style}} ref={setNodeRef} {...attributes} {...listeners}>
          <CardActionArea>
            <CardContent sx={{textAlign: 'center', backgroundColor: 'lightgray', height:'150px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <Typography gutterBottom variant="h5" component="div" sx={{color: '#0F82E4', fontWeight: 'bold' }}>
                Directed Course
              </Typography>
              <Typography gutterBottom variant="h6" sx={{ color: 'text.secondary', fontSize: '0.75rem'}}>
                Units: {10}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
    
    case "completed":

      return (
        <Card sx={{...cardStyle, ...style}} ref={setNodeRef} {...attributes} {...listeners}>
          <CardActionArea>
            <CardContent sx={{textAlign: 'center', backgroundColor: 'lightgray', height:'150px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <Typography gutterBottom variant="h5" component="div" sx={{color: '#0F82E4', fontWeight: 'bold' }}>
	    	        Completed Course
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );

    default:
      
      return (
        <Card sx={{...cardStyle, ...style}} ref={setNodeRef} {...attributes} {...listeners}>
          <CardActionArea>
            <CardContent sx={{textAlign: 'center', backgroundColor: 'lightgray', height:'150px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <Typography gutterBottom variant="h5" component="div" sx={{color: '#0F82E4', textDecoration: 'underline', fontWeight: 'bold'}} 
                onClick={() => window.open(getCourseURL(props.text._id), "_blank", 'noopener,noreferrer')}
              >
	    	        {getFullCourseCode(props.text._id)}
              </Typography>
              <Typography gutterBottom variant="h6" sx={{ color: 'text.secondary', fontSize: '1rem'}}>
                {props.text.course_name}
              </Typography>
              <Typography gutterBottom variant="h6" sx={{ color: 'text.secondary', fontSize: '0.75rem'}}>
	    		      Units: {props.text.credits}
              </Typography>
              {/* <Button variant="contained" color="primary" component="a" href={getCourseURL(props.text._id)} target="_blank" rel="noopener noreferrer">
                Course Handbook
              </Button> */}
            </CardContent>
          </CardActionArea>
        </Card>
      );
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

function getCourseURL(courseId)
{
  let courseCode = getFullCourseCode(courseId);

  return "https://www.newcastle.edu.au/course/" + courseCode;
}

/* Old card styling
const cardStyle = { // Defining a constant object cardStyle to hold the CSS styles for the card
  padding: '8px', // Setting padding inside the card to create space around the text
  margin: '4px', // Setting margin outside the card to create space between this card and others
  backgroundColor: '#f0f0f0', // Setting the background color of the card to a light gray
  border: '1px solid #ccc', // Adding a solid border with a light gray color
  borderRadius: '4px', // Rounding the corners of the card
  textAlign: 'center', // Centering the text horizontally within the card
};

export default Card; // Exporting the Card component as the default export
*/









