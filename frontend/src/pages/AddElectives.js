import React, { useState, useEffect } from 'react'; // Importing React, useState, and useEffect hooks
import Menu from '../components/Menu'; // Importing the Menu component
import Dropdown from '../components/Dropdown'; // Importing the Dropdown component
import Text from '../components/Text'; // Importing the Text component
import Button from '../components/Button'; // Importing the Button component
import Link from '../components/Link'; // Importing the Link component
import { useNavigate } from 'react-router-dom'; // Importing the useNavigate hook from react-router-dom

const AddElectives = () => {
    const [electives, setElectives] = useState([]); // State to hold the elective options
    const [selectedElectives, setSelectedElectives] = useState([]); // State to hold the selected electives
    const [availableElectives, setAvailableElectives] = useState([]); // State to hold the available electives fetched from the API
    const navigate = useNavigate(); // Initializing the useNavigate hook for navigation

    useEffect(() => {
        // Fetch the list of available electives from the API when the component mounts
        fetch('http://localhost:3001/api/electives/getElectiveList', {
            method: 'POST', // Sending a POST request
            headers: { 'Content-Type': 'application/json' }, // Setting the content type to JSON
        })
            .then(response => response.json()) // Parsing the JSON response
            .then(data => setAvailableElectives(data.electiveList || [])) // Updating the availableElectives state with the data from the response
            .catch(error => console.error('Error:', error)); // Logging any errors that occur during the fetch
    }, []); // Empty dependency array means this effect runs once when the component mounts

    const handleElectiveChange = (e) => {
        // Function to handle changes in the selected electives
        const selectedValue = e.target.value; // Get the value of the selected elective
        setSelectedElectives(prevSelected => {
            // Update the selectedElectives state
            if (prevSelected.includes(selectedValue)) {
                // If the elective is already selected, remove it from the selectedElectives array
                return prevSelected.filter(elective => elective !== selectedValue);
            }
            // If the elective is not selected, add it to the selectedElectives array
            return [...prevSelected, selectedValue];
        });
    };

    const handleNext = () => {
        // Function to handle the "Continue" button click
        console.log('Selected Electives:', selectedElectives); // Log the selected electives to the console
        navigate('/view-planner'); // Navigate to the "View Planner" page
    };

    return (
        <div style={{ display: 'flex' }}>
            {/* Main container with flexbox layout */}
            <Menu /> {/* Menu component */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
                {/* Centered content container */}
                <Text type="h1">Add Electives</Text> {/* Heading for the Add Electives page */}
                <Text type="h2">Choose your directed and other electives</Text> {/* Subheading for the elective selection */}
                <Dropdown
                    id="electives" // Dropdown component for selecting electives
                    label="Select Electives:" // Label for the dropdown
                    options={availableElectives.map(ele => ({ value: ele.elective_name, label: ele.elective_name }))} // Map availableElectives to dropdown options
                    value={selectedElectives} // Bind the dropdown value to the selectedElectives state
                    onChange={handleElectiveChange} // Handle changes in the dropdown selection
                    multiple // Allow multiple selections
                />
                <div>
                    {/* Navigation buttons */}
                    <Button onClick={handleNext} text="Continue" /> {/* Button to continue to the next step, triggers handleNext function */}
                    <Link to="/profile" text="Profile" /> {/* Link to Profile page */}
                    <Link to="/completed" text="Completed" /> {/* Link to Completed page */}
                    <Link to="/view-planner" text="View Planner" /> {/* Link to View Planner page */}
                    <Link to="/logout" text="Logout" /> {/* Link to Logout page */}
                    <Link to="/help" text="Help" /> {/* Link to Help page */}
                    <Link to="/select" text="Create new planner"/>{/* Link to Select page */}
                    <Link to="https://askuon.newcastle.edu.au/" text="Ask Uon" external /> {/* External link to Ask Uon */}
                </div>
            </div>
        </div>
    );
};

export default AddElectives; // Exporting the AddElectives component as the default export


