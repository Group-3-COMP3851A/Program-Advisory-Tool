import React, { useContext } from 'react';
import { useDrag } from 'react-dnd'; //For later use
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AppContext } from '../AppContext';

export default function OutlinedCard(props) {

  let { coursesPerSem } = useContext(AppContext);
  if (!coursesPerSem) {
    coursesPerSem = localStorage.getItem('coursesPerSem');
  } else localStorage.setItem('coursesPerSem', coursesPerSem);

  let cardStyle = {width: `${700/coursesPerSem}px`, margin: '1%'};

  // This might not be the best way to do this, but it works, for the time being
  switch (props.text.code)
  {
    case "elective":
    case "directed":

      let courseType = props.text.code === "elective" ? "Elective" : "Directed Course"; 

      return (
        <Card sx={cardStyle}>
          <CardActionArea>
            <CardContent sx={{textAlign: 'center', backgroundColor: 'lightgray', height:'150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '0.6rem'}}>
              <Typography gutterBottom variant="h5" component="div" sx={{color: '#0F82E4', fontWeight: 'bold', fontSize: '0.6rem' }}>
	    	        {courseType}
              </Typography>
              <Typography gutterBottom variant="h6" sx={{ color: 'text.secondary', fontSize: '0.1rem'}}>
                Units: {10}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
    default:
      
      return (
        <Card sx={cardStyle}>
          <CardActionArea>
            <CardContent sx={{textAlign: 'center', backgroundColor: 'lightgray', height:'150px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <Typography gutterBottom variant="h5" component="div" sx={{color: '#0F82E4', textDecoration: 'underline', fontWeight: 'bold', fontSize: '0.6rem'}} onClick={() => window.open(getCourseURL(props.text._id), "_blank", 'noopener,noreferrer')}>
	    	        {getFullCourseCode(props.text._id)}
              </Typography>
              <Typography gutterBottom variant="h6" sx={{ color: 'text.secondary', fontSize: '0.7rem'}}>
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









