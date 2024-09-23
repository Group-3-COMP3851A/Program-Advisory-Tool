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
        getOptionLabel={(option) => option.course_name}
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

export function SearchBox(props) {
	  const { options, value, onChange } = props;

  return (
    <div className="search-container">
      <Autocomplete
        options={options}
		getOptionLabel={(option) => option.degree_name}
		onChange={(event, newValue) => {
			onChange(newValue);
		}}
        sx={{ width: '100%' }}  
        renderInput={(params) => <TextField {...params} label={props.label} />}
      />
    </div>
  );
}