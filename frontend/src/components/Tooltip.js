import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import IconButton from '@mui/material/IconButton';

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

export default function ToolTip(props) {
  return (
    <div className='helpIcon'>
      <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">Help</Typography>
            {props.text1}
			<br/>
			<br/>
            {props.text2}
          </React.Fragment>
        }
      >
		<IconButton><HelpOutlineIcon style={{fontSize:50}}/></IconButton>
      </HtmlTooltip>
    </div>
  );
}