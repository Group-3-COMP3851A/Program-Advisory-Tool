import * as React from 'react';
import Popover from '@mui/material/Popover';
import Link from '@mui/material/Link';
import '../styles/style.css';

function getCourseID(internalId)
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
    case "en":
      fullName = "ENGG";
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
    case "st":
      fullName = "STAT";
      break;
    case "le":
      fullName = "LEGL";
      break;
    case "mk":
      fullName = "MKTG";
      break;
    case "mn":
      fullName = "MNGT";
      break;
    case "ac":
      fullName = "ACFI";
      break;
    case "sc":
      fullName = "SCIE";
      break;
    case "eb":
      fullName = "EBUS";
      break;
    default:
      fullName = courseId;
  }

  return fullName + courseName;
}

function checkCourseFollow(course)
{
	if(course.course_follow.length > 0)
		return(<p>This course must be immediately followed by {getCourseID(course.course_follow)}</p>);
}

function listAssumed(courses)
{
	if(courses.length === 0) {
		return (<h3>This course has no assumed knowledge requirements</h3>);
	}	

	let listItems = [];	
	//Loop through each item in the assumed knowledge array, some items
	//will be an array of courses, some will be a single course, add to an array
	for(let i=0; i < courses.length; i++) {
		if(Array.isArray(courses[i])) { //Make a string for the OR requisites
			let listOrs = [];
			for(let j=0;j<courses[i].length;j++) {
				listOrs.push(getCourseID(courses[i][j]));
			}
			listItems.push(listOrs.join(' or '));
		}
		else if(courses[i].slice(-2) === "us") {
			listItems.push("This course requires you to have completed " + courses[i].slice(0, -2) + " units");
		}
		else {
			listItems.push(getCourseID(courses[i]));
		}
	}
	
	listItems = listItems.map((entry) => <li key={entry}>{entry}</li>);
	return (
	<div>
	<h3>Course Assumed Knowledge:</h3>
	<ul>
		{listItems}
	</ul>
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
		>
		<div className='cardPopover'>
			<h2>{getCourseID(props.course._id)}</h2>
			<p>{props.course.course_name}</p>
			{checkCourseFollow(props.course)}
			{listAssumed(props.course.assumed_knowledge)}
			<br/>
			<Link href={courseURL} target="_blank" underline="always">Course Webpage</Link>
		</div>
      </Popover>
  );
}