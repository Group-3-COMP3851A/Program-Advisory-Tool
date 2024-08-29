import React from 'react';
import Text from '../components/Text';
import Menu from '../components/Menu';
import Link from '../components/Link';
const ViewPlanner = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Menu />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <Text type="h1">Profile Page</Text>
        <Text type="h2">Welcome to your profile!</Text>
      </div>
      <div>
                <Link to="/profile" text="Profile" />
                <Link to="/view-planner" text="View Planner" />
                <Link to="/logout" text="Logout" />
                <Link to="/help" text="Help" />
                <Link to="https://askuon.newcastle.edu.au/" text="Ask Uon" external />
                <Link to="/completed" text="Completed"/>
                <Link to="/generate-plan" text="Generate Plan"/>
                <Link to="/select" text="Create new planner"/>{/* Link to Select page */}
                </div>
    </div>
    
  );
};

export default ViewPlanner;
