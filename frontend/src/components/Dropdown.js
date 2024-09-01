import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Dropdown(props)
{
	return(
	<Box sc={{minWidth: 120}}>
		<InputLabel>{props.label}</InputLabel>
		<Select
			id={props.id}
			value={props.label}
			label={props.label}
			onChange={props.onChange}
		>
		<option value="">--Select--</option>
		{props.options.map((option, index) => (
			<MenuItem key={index} value={option.value}>{option.label}</MenuItem>))}
		</Select>
	</Box>
	);
}