import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function MultiSearchBox(props) {
  const { options, value, onChange } = props;

  return (
    <div className="search-container">
      <Autocomplete
        multiple
        value={value}
        options={options}
        getOptionLabel={(option) => getFullCourseCode(option._id) + " - " + option.course_name}
        onChange={(event, newValue) => {
          onChange(newValue);
        }}
        id="controllable-states-demo"
        sx={{ width: '100%' }}  
        renderInput={(params) => <TextField {...params} label="Type or select the courses names you have previously completed " />}
      />
    </div>
  );
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

//The main degree select bar
export function SearchBox(props) {
	  const { options, value, onChange } = props;

  return (
    <div className="search-container">
      <Autocomplete
        options={options}
		getOptionLabel={(option) => option.degree_name}
		onChange={(event, newValue) => {
			newValue = newValue.degree_name;
			onChange(newValue);
		}}
        sx={{ width: '100%' }}  
        renderInput={(params) => <TextField {...params} label={props.label} />}
      />
    </div>
  );
}