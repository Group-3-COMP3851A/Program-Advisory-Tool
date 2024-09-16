import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SearchBox(props) {
  const [value, setValue] = React.useState(props.options);

  return (
    <div>
      <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <br />
      <Autocomplete
        value={props.value}
		options={props.options}
        onChange={props.onChange}
        id="controllable-states-demo"
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Controllable" />}
      />
    </div>
  );
}