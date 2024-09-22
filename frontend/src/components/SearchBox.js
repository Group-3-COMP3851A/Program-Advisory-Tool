import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SearchBox(props) {
  const { options, value, onChange } = props;

  return (
    <div>
      <div>{`Selected Courses: ${value.length > 0 ? value.map(course => course.course_name).join(', ') : 'None'}`}</div>
      <br />
      <Autocomplete
        multiple // Enable multiple selection
        value={value} // Set the current value
        options={options} // List of options
        getOptionLabel={(option) => option.course_name} // Display course names
        onChange={(event, newValue) => {
          onChange(newValue); // Update the selected courses
        }}
        id="controllable-states-demo"
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Select Courses" />}
      />
    </div>
  );
}
