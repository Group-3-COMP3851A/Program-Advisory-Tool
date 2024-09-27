import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

export default function BasicPopover(props) {
	
  if(!props.disabled) return (<></>);
  
  return (
      <Popover
        open={props.disabled}
		anchorEl={props.anchor}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
  );
}