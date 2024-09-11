import React, { useState } from 'react'; // Importing React and useState hook for managing component state
import '../styles/style.css';
import Text from '../components/Text'; // Importing the Text component
import Menu from '../components/Menu'; // Importing the Menu component
import Button from '../components/Button'; // Importing the Button component
import Form from '../components/Form'; // Importing the Form component
import TextInput from '../components/Input';
import Link from '../components/Link'; // Importing the Link component

const Logout = () => {
  // Initializing state variables for username and password using the useState hook
  const [username, setUsername] = useState(''); // State for storing the username input value
  const [password, setPassword] = useState(''); // State for storing the password input value

  const handleLoginSubmit = (e) => {
    // Handler function for form submission
    e.preventDefault(); // Prevent the default form submission behavior
    console.log('Username:', username); // Log the username to the console
    console.log('Password:', password); // Log the password to the console
  };

  return (
	<div className='global'>
        <Menu curentPage="select"/>
		<div className='main-section'>
        {/* Centered content container */}
        <Text type="h1">Log In</Text> {/* Heading for the Login page */}
        <Text type="h2">Please enter your details to log in</Text> {/* Subheading for the Login page */}
        
        {/* Combined Login Form */}
        <Form onSubmit={handleLoginSubmit}> {/* Form component with an onSubmit handler */}
          <TextInput placeholder="Username">
			<input
				type="text"
				value={username} // Value bound to the username state
				onChange={(e) => setUsername(e.target.value)} // Update username state on input change
				style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '20px' }} // Styling for the input
			/>
		  </TextInput>
		  <TextInput placeholder="Password">
			<input
				type="password"
				value={password} // Value bound to the password state
				onChange={(e) => setPassword(e.target.value)} // Update password state on input change
				style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '20px' }} // Styling for the input
			/>
		  </TextInput> 
          <Button type="submit" text="Log In"/> 
        </Form>
      </div>
    </div>
  );
};

export default Logout; // Exporting the Logout component as the default export
