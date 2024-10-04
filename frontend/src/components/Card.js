import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { AppContext } from '../AppContext';
import BasicPopover from './Popover';
import { Box, Popover } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


export const OutlinedCard = ({text, ...props}) => {
	
  const [directedCourseList, setDirectedCourseList] = useState([]);
  const [courseInfoPopoverState, setCourseInfoPopoverState] = useState(false);
  const [courseInfoAnchorEl, setCourseInfoAnchorEl] = React.useState(null);
  const [conflictAnchorEl, setConflictAnchorEl] = React.useState(null);
  
  const handleCourseInfoClick = (event) => {
	  setCourseInfoPopoverState(!courseInfoPopoverState);
    setCourseInfoAnchorEl(event.currentTarget);
  };

  const handleConflictHoverEnter = (event) => {
    setConflictAnchorEl(event.currentTarget);
  }

  const handleConflictHoverExit = () => {
    setConflictAnchorEl(null);
  }

  let colourOfInfo = {color: 'white'}
  if (text.conflicts && text.conflicts.length > 0) colourOfInfo = {color: 'red'}
  
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

  const conflictText = (courseConflicts, name) => {
    let conflictText = [];
    // semester: the course is in the wrong semester
    // uos: the course does not meet uos requirements
    // ass: the course is missing assumed knowledge
    // req: the course is missing requisite knowledge
    // followRequirement: the course has a follower course that is not present in the following semester
    if (courseConflicts !== undefined) {
      courseConflicts.forEach((conflict, i) => {
        switch (conflict[0]){
          case "semester":
            conflictText.push(<li key={i}>The course is in the wrong semester</li>);
            break;
          case "uos":
            conflictText.push(<li key={i}>Units of study requirements are not met. You must study {conflict[1]} units in previous semesters\n</li>)
            break;
          case "ass":
            conflictText.push(<li key={i}>Assumed knowledge: {getFullCourseCode(conflict[1])}</li>)
            break;
          case "req":
            conflictText.push(<li key={i}>Requisite knowledge: {getFullCourseCode(conflict[1])}</li>);
            break;
          case "followRequirement":
            conflictText.push(<li key={i}>Follower course ({getFullCourseCode(conflict[1])}) that is not present in the following semester</li>);
            break;
          default:
            break;
        }
      });
    }
    if (conflictText.length > 0) {
      return (
        <div style={{margin: '20px'}}>
          <p>The follow dependencies are not met: </p>
          <ul>
            {conflictText}
          </ul>
        </div>

      )
    } else return <p style={{margin: '20px'}}>Course has no conflicts</p>;
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
              <Typography className="card-subtitle" variant="h6">
                Units: 10
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );

    default:
      return (
        <Card className="card-container">
          <CardActionArea>
            <CardContent className="card-content" >
              <Box>
                <Typography
                  className="card-link underline-title"
                  variant="h5"
                  /*onClick={() => window.open(getCourseURL(text._id), "_blank", 'noopener,noreferrer')}*/
                  onClick={handleCourseInfoClick}
                >
                <BasicPopover course={text} disabled={courseInfoPopoverState} anchor={courseInfoAnchorEl}/>
                {getFullCourseCode(text._id)}
                </Typography>
                <InfoOutlinedIcon onMouseEnter={handleConflictHoverEnter} onMouseLeave={handleConflictHoverExit} sx={colourOfInfo}/>
                <Popover
                  open={Boolean(conflictAnchorEl)}
                  anchorEl={conflictAnchorEl}
                  sx={{pointerEvents: 'none'}}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  disableRestoreFocus
                  onClose={handleConflictHoverExit}
                >
                 {conflictText(text.conflicts, text._id)}
                </Popover>
              </Box>
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


