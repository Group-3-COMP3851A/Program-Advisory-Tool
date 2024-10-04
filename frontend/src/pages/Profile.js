import React from 'react'; // Importing React library
import '../styles/style.css';
import Menu from '../components/Menu'; // Importing the Menu component
import Text from '../components/Text'; // Importing the Text component

const Profile = () => {
  return (
	<div className='global'>
		
		<div className='main-section'>
        {/* Centered content container */}
        <Text type="h1">Profile Page"still in development/apart of possibly future out of scope functionality"</Text> {/* Heading for the Profile page */}
        <Text type="h2">Welcome to your profile!</Text> {/* Subheading for the Profile page */}
      </div>
    </div>
  );
};

export default Profile; // Exporting the Profile component as the default export

