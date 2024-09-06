import React from 'react';
import '../styles/style.css';
import Text from '../components/Text';
import Menu from '../components/Menu';
import Link from '../components/Link';

const Help = () => {
  return (
		<div className='global'>
            <Menu curentPage="select"/>
			<div className='main-section'>
				<Text type="h1">Help Page</Text>
			</div>
		</div>
  );
};

export default Help;
