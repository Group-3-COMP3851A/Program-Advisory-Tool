import React, { useState, useContext, useEffect } from 'react'; // Importing React and useState hook for managing component state
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';
import Text from '../components/Text'; // Importing the Text component
import Menu from '../components/Menu'; // Importing the Menu component
import Button from '../components/Button'; // Importing the Button component
import Form from '../components/Form'; // Importing the Form component
import TextInput from '../components/Input';
import { AppContext } from '../AppContext';

const Logout = () => {
  // Initializing state variables for username and password using the useState hook
  const { studentId, setStudentId } = useContext(AppContext);
  const [password, setPassword] = useState(''); // State for storing the password input value
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setStudentId(''); // Reset studentId
    setPassword(''); // Reset password
  }, [setStudentId]);

  const handleLoginSubmit = (e) => {
    // Handler function for form submission
    e.preventDefault(); // Prevent the default form submission behavior
    //console.log('Username:', studentId); // Log the username to the console
    //console.log('Password:', password); // Log the password to the console

    // TODO: Replace with an API request which verifies the specified student id and password
    // Basically just look for the student object with a matching student id, and check if the password for that object matches the input password
    if (!studentId && !password){
      setErrorMessage('Please input your Student ID and your Password');
      return;
    }

    navigate('/profile', { state: { studentId } });
  };

  return (
	  <div className='global'>
		  <div className='main-section'>
        <Text type="h1">Log In</Text>
        <Text type="h2">Please enter your details to log in</Text>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center'}}>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '20px' }}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '20px' }}
            />
          {errorMessage && <Text type="p" style={{ color: 'red' }}>{errorMessage}</Text>}
          <Button onClick={handleLoginSubmit} text="Log In"/> 
        </div>
      </div>
    </div>
  );
};

export default Logout; // Exporting the Logout component as the default export
