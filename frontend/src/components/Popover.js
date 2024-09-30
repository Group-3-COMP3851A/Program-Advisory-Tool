import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function getCourseID(id)
{
  let courseString = String(id);
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

function checkCourseFollow(course)
{
	if(course.course_follow.length > 0)
		return(<h3>You must do this course after {course.course_follow[0]}</h3>);
}

function listAssumed(assumed)
{
	let listItems = "";
	if(assumed.length == 0)	{
		return (<h3>This course has no assumed knowledge requirements</h3>);
	}
	else if(assumed.length == 1) {
		listItems = getCourseID(assumed[0]);
	}
	else if(assumed.length > 1) {
		listItems = assumed.map((entry) => <li key={entry}>{getCourseID(entry)}</li>);
	}
	
	return (
	<div>
	<h3>Course Assumed Knowledge:</h3>
	{listItems}
	</div>
	);
}

export default function BasicPopover(props) {
	
	if(!props.disabled) return (<></>); //If the 'edit' mode is ACTIVE, return
  
	let courseID = getCourseID(props.course._id);
	let courseURL = "https://www.newcastle.edu.au/course/" + courseID;
  
  return (
      <Popover
        open={props.disabled}
		anchorEl={props.anchor}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
		>
			{checkCourseFollow(props.course)}
			{listAssumed(props.course.assumed_knowledge)}
			<Link href={courseURL} target="_blank" underline="always">Course Webpage</Link>

      </Popover>
  );
}