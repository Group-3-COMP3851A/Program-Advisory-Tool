import React from 'react';
import Menu from '../components/Menu';
import Text from '../components/Text';
import Button from '../components/Button';
import Link from '../components/Link';
import { useNavigate } from 'react-router-dom';

const Completed = () => {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/add-electives'); // Correct path for navigation
    };

    return (
        <div style={{ display: 'flex' }}>
            <Menu />
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
                <Text type="h1">Completed Courses</Text>
                <Text type="h2">Great! It looks like you have completed some courses before.</Text>
                <Text type="p">Based on your input, we will proceed with setting up your program. If you have any specific details or requirements, please let us know.</Text>
                <Button onClick={handleNext} text="Continue" />
                <Link to="/profile" text="Profile" />
                <Link to="/create-new-planner" text="Create New Planner" />
                <Link to="/view-planner" text="View Planner" />
                <Link to="/logout" text="Logout" />
                <Link to="/help" text="Help" />
                <Link to="https://askuon.newcastle.edu.au/" text="Ask Uon" external />
            </div>
        </div>
    );
};

export default Completed;

