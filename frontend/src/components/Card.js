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

  const { coursesPerSem } = useContext(AppContext);

  let cardStyle = {margin: '1%'};

  switch (coursesPerSem)
  {
    case 2:
      cardStyle = {width: '50%', margin: '1%'};
      break;
    case 3:
      cardStyle = {width: '33%', margin: '1%'};
      break;
    default:
      cardStyle = {width: '25%', margin: '1%'};
      break;
  }

  // This might not be the best way to do this, but it works, for the time being
  switch (props.text.code)
  {
    case "elective":
    case "directed":

      let courseType = props.text.code === "elective" ? "Elective Course" : "Directed Course"; 

      return (
        <Card sx={cardStyle}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
	    	        {courseType}
              </Typography>
              <Typography gutterBottom variant="h6" sx={{ color: 'text.secondary' }}>
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
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
	    	        {getFullCourseCode(props.text._id)} - {props.text.course_name}
              </Typography>
              <Typography gutterBottom variant="h6" sx={{ color: 'text.secondary' }}>
	    		      Units: {props.text.credits}
              </Typography>
              <Button variant="contained" color="primary" component="a" href={getCourseURL(props.text._id)} target="_blank" rel="noopener noreferrer">
                Course Handbook
              </Button>
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









