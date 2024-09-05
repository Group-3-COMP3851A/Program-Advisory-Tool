import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Dropdown(props)
{
	return(
	<FormControl sx={{m: 1, minWidth: 120}}>
		<InputLabel>{props.label}</InputLabel>
		<Select
			id={props.id}
			value={props.value}
			label={props.label}
			onChange={props.onChange}
		>
		{props.options.map((option, index) => (
			<MenuItem key={index} value={option.value}>{option.label}</MenuItem>))}
		</Select>
	</FormControl>
	);
}