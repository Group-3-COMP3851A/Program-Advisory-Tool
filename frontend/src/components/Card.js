// edited by Muhammad 11/10/24: change the location of popup on hover to display at the top and put them in boxes and then design them
import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { AppContext } from '../AppContext';
import BasicPopover from './Popover';
import { Box, Dialog, DialogTitle, IconButton, List, ListItem, ListItemButton, ListItemText, Popover } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';


export const OutlinedCard = ({text, semesterIndex, setDirected}) => {
	
  const [directedSelectionOpen, setDirectedSelectionOpen] = useState(false);
  const [directedCourses, setDirectedCourses] = useState([]);
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

  const handleDirectedSelectionOpen = () => {
    setDirectedSelectionOpen(true);
  };

  const handleDirectedSelectionClose = (value) => {
    setDirectedSelectionOpen(false);
    value["code"] = "directed";
    value["number"] = text.number;
    setDirected(text, value);
  }

  let colourOfInfo = {color: 'black'}
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


  const getDirectedCourseFromSemester = async (major, semester, completedCourses) =>{
    return fetch('http://localhost:3001/api/course/getDirectedListFromSemester', {
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
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const handleDirectedSelection = () => {
    getDirectedCourseFromSemester(major, semesterIndex+1, completedCourses).then((response) => {
      setDirectedCourses(response.courseList, handleDirectedSelectionOpen());
    })
  }

  const conflictText = (courseConflicts) => {
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
            conflictText.push(<li key={i}>The course is not offered in this semester</li>);
            break;
          case "uos":
            conflictText.push(<li key={i}>Units of study requirements are not met. You must study {conflict[1]} units before taking this course</li>)
            break;
          case "ass":
            if (Array.isArray(conflict[1])) {
              conflictText.push(<li key={i}>Assumed knowledge: {conflict[1].map(code => getFullCourseCode(code)).join(" or ")}</li>);
            } else {
              conflictText.push(<li key={i}>Assumed knowledge: {getFullCourseCode(conflict[1])}</li>);
            }
            break;
          case "req":
            conflictText.push(<li key={i}>Requisite knowledge: {getFullCourseCode(conflict[1])}</li>);
            break;
          case "followRequirement":
            conflictText.push(<li key={i}>Follower course ({getFullCourseCode(conflict[1])}) is not present in the following semester</li>);
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

  const handleRemoveDirected = () => {
    //need to basically set the index of the course to be the old directed value
    const placeholder = {
      code: text.code,
      number: text.number
    }
    setDirected(text, placeholder);
  }

  // This might not be the best way to do this, but it works, for the time being
  switch (text.code) {
    case "elective":
      return (
        <Card className="card-container">
          <CardContent className="card-content">
            <Typography className="card-title" variant="h5">
              Elective
            </Typography>
            <Typography className="card-subtitle" variant="h6">
              Units: 10
            </Typography>
          </CardContent>
        </Card>
      );
    
    case "directed":
      if (text._id) return (
        <Card className="card-container">
            <Box className='d-pop'>
              {/* Card pop up on hover function starts here */}
              <InfoOutlinedIcon onMouseEnter={handleConflictHoverEnter} onMouseLeave={handleConflictHoverExit} sx={colourOfInfo}/>
              <Popover
                open={Boolean(conflictAnchorEl)}
                anchorEl={conflictAnchorEl}
                
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                disableRestoreFocus
                onClose={handleConflictHoverExit}
              >
                {conflictText(text.conflicts)}
              </Popover>
            </Box>
          <CardContent className="card-content" >
            <Box>
              <IconButton onClick={handleRemoveDirected}>
                <CloseIcon sx={{color: 'red'}}/>
              </IconButton>
              <Typography
                className="card-link underline-title"
                variant="h5"
                onClick={handleCourseInfoClick}
              >
              <BasicPopover course={text} disabled={courseInfoPopoverState} anchor={courseInfoAnchorEl}/>
              {getFullCourseCode(text._id)}
              </Typography>
              
            </Box>
            <Typography className="card-subtitle" variant="h6">
              {text.course_name}
            </Typography>
            <Typography className="card-subtitle" variant="h6">
              Units: {text.credits}
            </Typography>
          </CardContent>
        </Card>
      )
      return (
        <Card className="card-container">
          <Box className='d-pop'>
          <InfoOutlinedIcon onMouseEnter={handleConflictHoverEnter} onMouseLeave={handleConflictHoverExit} sx={{color:"black"}}/>
             <Popover
                open={Boolean(conflictAnchorEl)}
                anchorEl={conflictAnchorEl}
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
                <Typography sx={{margin: '20px'}}>Directed Courses may have assumed knowledge that is unmet. Full checking can be guaranteed upon selection of a directed course.</Typography>
              </Popover>
            </Box>
          <CardContent className="card-content directed-course">
             
            <Typography className="card-title small-title" variant="h5" onClick={handleDirectedSelection}>
              Directed Course
            </Typography>
            <DirectedCourseSelectionDialog open={directedSelectionOpen} onClose={handleDirectedSelectionClose} courses={directedCourses}/> 
           
            <Typography className="card-subtitle" variant="h6">
              Units: 10
            </Typography>
          </CardContent>
        </Card>
      );

    default:
      return (
        <Card className="card-container">
          <Box className='c-pop'>
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
                {conflictText(text.conflicts)}
              </Popover>

          </Box>
          <CardContent className="card-content" >
            <Box>
              <Typography
                className="card-link underline-title"
                variant="h5"
                onClick={handleCourseInfoClick}
              >
              <BasicPopover course={text} disabled={courseInfoPopoverState} anchor={courseInfoAnchorEl}/>
              {getFullCourseCode(text._id)}
              </Typography>
            </Box>
            <Typography className="card-subtitle" variant="h6">
              {text.course_name}
            </Typography>
            <Typography className="card-subtitle" variant="h6">
              Units: {text.credits}
            </Typography>
          </CardContent>
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

const DirectedCourseSelectionDialog = (props) => {
  const {onClose, open, courses} = props;

  const handleClose = () => {
    onClose([]);
  }

  const handleCourseClicked = (value) => {
    onClose(value);
  }

  return (
    <Dialog onClose = {handleClose} open = {open}>
      <DialogTitle>Directed Course Selection</DialogTitle>
      <List>
        {courses.map((course) => (
          <ListItem key={course._id}>
            <ListItemButton onClick={() => handleCourseClicked(course)}>
              <ListItemText primary={course.course_name}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}