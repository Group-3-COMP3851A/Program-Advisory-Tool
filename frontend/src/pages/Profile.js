import React from 'react'; // Importing React library
import '../styles/style.css';
import Menu from '../components/Menu'; // Importing the Menu component
import Text from '../components/Text'; // Importing the Text component
import Link from '../components/Link'; // Importing the Link component

const Profile = () => {
  return (
	<div className='global'>
		<Menu curentPage="select"/>
		<div className='main-section'>
        {/* Centered content container */}
        <Text type="h1">Profile Page</Text> {/* Heading for the Profile page */}
        <Text type="h2">Welcome to your profile!</Text> {/* Subheading for the Profile page */}
      </div>
    </div>
  );
};

export default Profile; // Exporting the Profile component as the default export

