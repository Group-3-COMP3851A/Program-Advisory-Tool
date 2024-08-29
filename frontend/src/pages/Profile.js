import React from 'react'; // Importing React library
import Menu from '../components/Menu'; // Importing the Menu component
import Text from '../components/Text'; // Importing the Text component
import Link from '../components/Link'; // Importing the Link component

const Profile = () => {
  return (
    <div style={{ display: 'flex' }}>
      {/* Main container with flexbox layout */}
      <Menu /> {/* Menu component */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        {/* Centered content container */}
        <Text type="h1">Profile Page</Text> {/* Heading for the Profile page */}
        <Text type="h2">Welcome to your profile!</Text> {/* Subheading for the Profile page */}
      </div>
      <div>
        {/* Navigation links */}
        <Link to="/profile" text="Profile" /> {/* Link to Profile page */}
        <Link to="/view-planner" text="View Planner" /> {/* Link to View Planner page */}
        <Link to="/logout" text="Logout" /> {/* Link to Logout page */}
        <Link to="/help" text="Help" /> {/* Link to Help page */}
        <Link to="https://askuon.newcastle.edu.au/" text="Ask Uon" external /> {/* External link to Ask Uon */}
        <Link to="/completed" text="Completed"/> {/* Link to Completed page */}
        <Link to="/generate-plan" text="Generate Plan"/> {/* Link to Generate Plan page */}
        <Link to="/select" text="Create new planner"/>{/* Link to Select page */}
      </div>
    </div>
  );
};

export default Profile; // Exporting the Profile component as the default export

