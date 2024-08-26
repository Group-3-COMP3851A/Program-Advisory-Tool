import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu';
import Dropdown from '../components/Dropdown';
import Text from '../components/Text';
import Button from '../components/Button';
import Link from '../components/Link';
import { useNavigate } from 'react-router-dom';

const AddElectives = () => {
    const [electives, setElectives] = useState([]);
    const [selectedElectives, setSelectedElectives] = useState([]);
    const [availableElectives, setAvailableElectives] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch available electives from API
        fetch('http://localhost:3001/api/electives/getElectiveList', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(data => setAvailableElectives(data.electiveList || []))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleElectiveChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedElectives(prevSelected => {
            if (prevSelected.includes(selectedValue)) {
                return prevSelected.filter(elective => elective !== selectedValue);
            }
            return [...prevSelected, selectedValue];
        });
    };

    const handleNext = () => {
        console.log('Selected Electives:', selectedElectives);
        // Navigate to the Generate Plan page
        navigate('/generate-plan'); // Ensure this path matches your route setup
    };

    return (
        <div style={{ display: 'flex' }}>
            <Menu />
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
                <Text type="h1">Add Electives</Text>
                <Text type="h2">Choose your directed and other electives</Text>
                <Dropdown
                    id="electives"
                    label="Select Electives:"
                    options={availableElectives.map(ele => ({ value: ele.elective_name, label: ele.elective_name }))}
                    value={selectedElectives}
                    onChange={handleElectiveChange}
                    multiple
                />
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

export default AddElectives;

