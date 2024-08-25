import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu';
import Dropdown from '../components/Dropdown';
import Text from '../components/Text';
import Button from '../components/Button';
import Link from '../components/Link';
import { useNavigate } from 'react-router-dom';

const Select = () => {
    const [degree, setDegree] = useState('');
    const [major, setMajor] = useState('');
    const [degreeList, setDegreeList] = useState([]);
    const [majorList, setMajorList] = useState([]);
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

    const handleNext = () => {
        navigate('/course-completion');
    };

    return (
        <div style={{ display: 'flex' }}>
            <Menu />
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
                <Text type="h1">Welcome to Program Planner</Text>
                <Text type="h2">Hi Student! Choose your degree and major</Text>
                <Dropdown
                    id="degree"
                    label="Select degree:"
                    options={degreeList.map(deg => ({ value: deg.degree_name, label: deg.degree_name }))}
                    value={degree}
                    onChange={showMajor}
                />
                {degree && (
                    <Dropdown
                        id="major"
                        label="Select major:"
                        options={majorList.map(maj => ({ value: maj.major_name, label: maj.major_name }))}
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                    />
                )}
                <Button onClick={handleNext} text="Continue" />
                <Link to="/profile" text="Profile" external />
                <Link to="/create-new-planner" text="Create New Planner" />
                <Link to="/view-planner" text="View Planner" />
                <Link to="/logout" text="Log out" />
                <Link to="/help" text="Help" external />
                <Link to="https://askuon.newcastle.edu.au/" text="Ask Uon" external />
            </div>
        </div>
    );
};

export default Select;




