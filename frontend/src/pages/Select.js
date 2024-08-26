import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu';
import Dropdown from '../components/Dropdown';
import Text from '../components/Text';
import Button from '../components/Button';
import Link from '../components/Link';
import PopUp from '../components/PopUp'; 
import { useNavigate } from 'react-router-dom';

const Select = () => {
    const [degree, setDegree] = useState('');
    const [major, setMajor] = useState('');
    const [degreeList, setDegreeList] = useState([]);
    const [majorList, setMajorList] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);
    const [showSecondPopUp, setShowSecondPopUp] = useState(false);
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3001/api/degree/getDegreeList', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(data => setDegreeList(data.degreeList || []))
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        setDropdownOptions([
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' }
        ]);
    }, []);

    const showMajor = (e) => {
        const selectedDegree = e.target.value;
        setDegree(selectedDegree);
        setMajor('');
        if (selectedDegree) {
            fetch('http://localhost:3001/api/major/getMajorList', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ degree: selectedDegree }),
            })
                .then(response => response.json())
                .then(data => setMajorList(data.majorList || []))
                .catch(error => console.error('Error:', error));
        } else {
            setMajorList([]);
        }
    };

    const handleMajorChange = (e) => {
        setMajor(e.target.value);
        if (e.target.value) {
            setShowPopUp(true);
        }
    };

    const handlePopUpClose = () => {
        setShowPopUp(false);
    };

    const handlePopUpConfirmYes = () => {
        setShowPopUp(false);
        navigate('/completed'); // Redirect to Completed page
    };

    const handlePopUpConfirmNo = () => {
        setShowPopUp(false);
        setShowSecondPopUp(true);
    };

    const handleSecondPopUpClose = () => {
        setShowSecondPopUp(false);
    };

    const handleCoursesSelect = (selectedOption) => {
        setSelectedCourses(selectedOption.value);
        console.log('Number of courses planned:', selectedOption.value);
        setShowSecondPopUp(false);
    };

    const handleNext = () => {
        if (!degree || !major) {
            setErrorMessage('Please select both degree and major before continuing.');
            return;
        }
        navigate('/generate-plan'); // Ensure this path is correct
    };

    return (
        <div style={{ display: 'flex' }}>
            <Menu />
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
                <Text type="h1">Welcome to Program Planner</Text>
                <Text type="h2">Hey Choose your degree and major</Text>
                <Dropdown
                    id="degree"
                    label="Degree:"
                    options={degreeList.map(deg => ({ value: deg.degree_name, label: deg.degree_name }))}
                    value={degree}
                    onChange={showMajor}
                />
                {degree && (
                    <Dropdown
                        id="major"
                        label="Major:"
                        options={majorList.map(maj => ({ value: maj.major_name, label: maj.major_name }))}
                        value={major}
                        onChange={handleMajorChange} // Update handler to include PopUp logic
                    />
                )}
                {errorMessage && <Text type="p" style={{ color: 'red' }}>{errorMessage}</Text>}
                <Button onClick={handleNext} text="Continue" />
                <Link to="/profile" text="Profile" />
                <Link to="/create-new-planner" text="Create New Planner" />
                <Link to="/view-planner" text="View Planner" />
                <Link to="/logout" text="Logout" />
                <Link to="/help" text="Help" />
                <Link to="https://askuon.newcastle.edu.au/" text="Ask Uon" external />
            </div>
            {showPopUp && (
                <PopUp 
                    message="Have you completed any courses before?"
                    onClose={handlePopUpClose}
                    onConfirmYes={handlePopUpConfirmYes}
                    onConfirmNo={handlePopUpConfirmNo}
                />
            )}
            {showSecondPopUp && (
                <PopUp 
                    message="How many courses do you plan to take per semester?"
                    options={dropdownOptions}
                    onClose={handleSecondPopUpClose}
                    onOptionSelect={handleCoursesSelect}
                />
            )}
        </div>
    );
};

export default Select;




