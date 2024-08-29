import React from 'react'; // Importing React library
import Menu from '../components/Menu'; // Importing the Menu component
import Text from '../components/Text'; // Importing the Text component
import Button from '../components/Button'; // Importing the Button component
import Link from '../components/Link'; // Importing the Link component
import { useNavigate } from 'react-router-dom'; // Importing the useNavigate hook from react-router-dom

const Completed = () => {
    const navigate = useNavigate(); // Initializing the useNavigate hook for navigation

    const handleNext = () => {
        navigate('/generate-plan'); // Function to navigate to the "Generate Plan" page when the button is clicked
    };

    return (
        <div style={{ display: 'flex' }}>
            {/* Main container with flexbox layout */}
            <Menu /> {/* Menu component */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
                {/* Centered content container */}
                <Text type="h1">Completed Courses</Text> {/* Heading for the Completed Courses page */}
                <Text type="h2">Great! It looks like you have completed some courses before.</Text> {/* Subheading indicating course completion */}
                <Text type="p">Based on your input, we will proceed with setting up your program. If you have any specific details or requirements, please let us know.</Text> {/* Additional instructions or information */}
                <Button onClick={handleNext} text="Continue" /> {/* Button to continue to the next step, triggers handleNext function */}
                <div>
                    {/* Navigation links */}
                    <Link to="/profile" text="Profile" /> {/* Link to Profile page */}
                    <Link to="/view-planner" text="View Planner" /> {/* Link to View Planner page */}
                    <Link to="/logout" text="Logout" /> {/* Link to Logout page */}
                    <Link to="/help" text="Help" /> {/* Link to Help page */}
                    <Link to="https://askuon.newcastle.edu.au/" text="Ask Uon" external /> {/* External link to Ask Uon */}
                    <Link to="/completed" text="Completed"/> {/* Link to Completed page (current page) */}
                    <Link to="/generate-plan" text="Generate Plan"/> {/* Link to Generate Plan page */}
                    <Link to="/select" text="Create new planner"/>{/* Link to Select page */}
                </div>
            </div>
        </div>
    );
};

export default Completed; // Exporting the Completed component as the default export

