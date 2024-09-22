import React, { useState, useEffect, useContext } from 'react'; // Importing React, useState, and useEffect hooks for component state and lifecycle management
import '../styles/style.css';
import Menu from '../components/Menu'; // Importing the Menu component
import Dropdown from '../components/Dropdown'; // Importing the Dropdown component
import Text from '../components/Text'; // Importing the Text component
import Button from '../components/Button'; // Importing the Button component
import PopUp from '../components/PopUp'; // Importing the PopUp component
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for navigation
import { AppContext } from '../AppContext';
import Tooltip from '../components/Tooltip';

//test
const Select = () => {
    // Initializing state variables using the useState hook
    const { degree, setDegree, major, setMajor, semCount, setSemCount, coursesPerSem, setCoursesPerSem, completedCourses } = useContext(AppContext);
    const [degreeList, setDegreeList] = useState([]); // State for storing the list of available degrees
    const [majorList, setMajorList] = useState([]); // State for storing the list of available majors based on the selected degree
    const [showPopUp, setShowPopUp] = useState(false); // State for controlling the visibility of the first PopUp
    const [showSecondPopUp, setShowSecondPopUp] = useState(false); // State for controlling the visibility of the second PopUp
    const [dropdownOptions, setDropdownOptions] = useState([]); // State for storing the options for the second PopUp dropdown
    const [errorMessage, setErrorMessage] = useState(''); // State for storing any error message related to form submission
    const navigate = useNavigate(); // Initializing the useNavigate hook for programmatically navigating between routes

    useEffect(() => {
        // Fetching the list of available degrees from the backend API when the component mounts
        fetch('http://localhost:3001/api/degree/getDegreeList', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // Setting the content type to JSON
        })
            .then(response => response.json()) // Parsing the JSON response from the server
            .then(data => setDegreeList(data.degreeList || [])) // Updating the degreeList state with the fetched data or an empty array if no data is received
            .catch(error => console.error('Error:', error)); // Logging any errors that occur during the fetch operation
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    useEffect(() => {
        // Setting the dropdown options for the second PopUp component
        setDropdownOptions([
            { value: '2', label: '2' }, // Option for 2 courses per semester
            { value: '3', label: '3' }, // Option for 3 courses per semester
            { value: '4', label: '4' }  // Option for 4 courses per semester
        ]);
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    const showMajor = (e) => {
        // Handler function for when a degree is selected
        const selectedDegree = e.target.value; // Get the value of the selected degree
        setDegree(selectedDegree); // Update the degree state with the selected degree
        setMajor(''); // Reset the major state
        if (selectedDegree) {
            // If a degree is selected, fetch the corresponding list of majors from the backend API
            fetch('http://localhost:3001/api/major/getMajorList', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }, // Setting the content type to JSON
                body: JSON.stringify({ degree: selectedDegree }), // Sending the selected degree as the request body
            })
                .then(response => response.json()) // Parsing the JSON response from the server
                .then(data => setMajorList(data.majorList || [])) // Updating the majorList state with the fetched data or an empty array if no data is received
                .catch(error => console.error('Error:', error)); // Logging any errors that occur during the fetch operation
        } else {
            setMajorList([]); // If no degree is selected, reset the major list
        }
    };

    function getSemesterCount(coursesPerSemester)
    {
        let count = 0;

        // Ideally we would have a unit count for each degree
        // formula should be the unit count divided by the courses per semester
        // for now we will just return static values
        switch (coursesPerSemester)
        {
            case 2:
                count = 12;
                break;
            case 3:
                count = 8;
                break;
            case 4:
                count = 6;
                break;
            default:
                count = 6;
                break;
        }

        return count;
    }

    const handleMajorChange = (e) => {
        // Handler function for when a major is selected
        setMajor(e.target.value); // Update the major state with the selected major
        if (e.target.value) {
            setShowPopUp(true); // Show the first PopUp if a major is selected
        }
    };

    const handlePopUpClose = () => {
        // Handler function to close the first PopUp
        setShowPopUp(false); // Set the showPopUp state to false
        setShowSecondPopUp(true); // Show the second PopUp
    };

    const handlePopUpConfirmYes = () => {
        // Handler function when the user confirms "Yes" in the first PopUp
        setShowPopUp(false); // Close the first PopUp
        navigate('/completed', { state: { degree, major, semCount, coursesPerSem, completedCourses } }); // Navigate to the '/completed' route
    };

    const handlePopUpConfirmNo = () => {
        // Handler function when the user confirms "No" in the first PopUp
        setShowSecondPopUp(false); // Close the second PopUp
    };

    const handleSecondPopUpClose = () => {
        // Handler function to close the second PopUp
        setShowSecondPopUp(false); // Set the showSecondPopUp state to false
    };

    const handleCoursesSelect = (e) => {
        // Handler function when a course selection is made in the second PopUp
        setCoursesPerSem(+e.target.value);

        // Maybe we could calculate this in the backend?
        const count = getSemesterCount(+e.target.value);
        setSemCount(count);
        setShowSecondPopUp(false); // Close the second PopUp
    };

    const handleNext = () => {
        // Handler function for the "Continue" button click
        if (!degree || !major) {
            setErrorMessage('Please select both degree and major before continuing.'); // Set an error message if degree or major is not selected
            return; // Exit the function early
        }
        navigate('/plan', { state: { degree, major, semCount, coursesPerSem, completedCourses } }); // Navigate to the '/generate-plan' route if both degree and major are selected
    };

    return (
		<div className='global'>
            <Menu/>
			<div className='main-section'>
                {/* Centered content container */}
                <Text type="h1">Welcome to Program Planner</Text>
                <Text type="h2">Please select your degree and major below</Text>
                <Dropdown
                    id="degree"
                    label="Degree:"
                    options={degreeList.map(deg => ({ value: deg.degree_name, label: deg.degree_name }))} // Map degree list to dropdown options
                    value={degree}
                    onChange={showMajor} // Handle degree selection
                />
                {degree && (
                    // Conditionally render the major dropdown if a degree is selected
                    <Dropdown
                        id="major"
                        label="Major:"
                        options={majorList.map(maj => ({ value: maj.major_name, label: maj.major_name }))} // Map major list to dropdown options
                        value={major}
                        onChange={handleMajorChange} // Handle major selection
                    />
                )}
                {errorMessage && <Text type="p" style={{ color: 'red' }}>{errorMessage}</Text>} {/* Display error message if present */}
                <Button onClick={handleNext} text="Continue" />
				<Tooltip text1="Select your degree and Major, then select how many courses you would like to do per semester"
					text2="4 Courses is considered full-time study."/>
            </div>
			{showPopUp && (
                // Conditionally render the first PopUp if showPopUp is true
                <PopUp 
                    message="How many courses do you plan to take per semester?"
                    options={dropdownOptions}
                    value={coursesPerSem}
                    onClose={handlePopUpClose}
                    onOptionSelect={handleCoursesSelect}
                />
            )}
            {showSecondPopUp && (
                // Conditionally render the second PopUp if showSecondPopUp is true
                <PopUp 
                    message="Have you completed any courses before?"
                    onClose={handleSecondPopUpClose}
                    onConfirmYes={handlePopUpConfirmYes}
                    onConfirmNo={handlePopUpConfirmNo}
                />
            )}
            </div>
    );
};

export default Select; // Exporting the Select component as the default export






