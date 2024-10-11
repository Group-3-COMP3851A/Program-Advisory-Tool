import React, { useState, useEffect, useContext, useMemo } from 'react';
import '../styles/style.css';
import Dropdown from '../components/Dropdown';
import { SearchBox } from '../components/SearchBox';
import Text from '../components/Text';
import Button from '../components/Button';
import PopUp from '../components/PopUp';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import Tooltip from '../components/Tooltip';

const Select = () => {
    const { degree, setDegree, major, setMajor, coursesPerSem, setCoursesPerSem, completedCourses } = useContext(AppContext);
    const [degreeList, setDegreeList] = useState([]);
    const [majorList, setMajorList] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);
    const [showSecondPopUp, setShowSecondPopUp] = useState(false);
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const coursesPerSemOptions = useMemo(
        () => [
            { value: "2", label: "2" },
            { value: "3", label: "3" },
            { value: "4", label: "4" },
        ],
        []
    );

    useEffect(() => {
        getDegreeList();
        setDropdownOptions(coursesPerSemOptions);			
    }, [coursesPerSemOptions]);

    const showMajor = (selectedDegree) => {
		setDegree(selectedDegree);
        setMajor('');
		//console.log(selectedDegree);
        if (selectedDegree) {
            getMajorList(selectedDegree);
		} else {
            setMajorList([]);
        }
    };

    const getDegreeList = () => {
        fetch('http://localhost:3001/api/degree/getDegreeList', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          })
          .then(response => response.json())
          .then(data => {
            //console.log(data.degreeList);
            setDegreeList(data.degreeList);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }
    
    const getMajorList = (selectedDegree) => {
        fetch('http://localhost:3001/api/major/getMajorList', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            degree: selectedDegree,
          }),
          })
          .then(response => response.json())
          .then(data => {
            //console.log(data.majorList);
            setMajorList(data.majorList || []);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }

    const handleMajorChange = (e) => {
        setMajor(e.target.value);
        if (e.target.value) {
            setShowPopUp(true);
        }
    };

    const handlePopUpClose = () => {
        setShowPopUp(false);
        setShowSecondPopUp(true);
    };

    const handlePopUpConfirmYes = () => {
        setShowPopUp(false);
        navigate('/completed', { state: { degree, major, coursesPerSem, completedCourses } });
    };

    const handlePopUpConfirmNo = () => {
        setShowSecondPopUp(false);
		navigate('/plan', { state: { degree, major, coursesPerSem, completedCourses } });
    };

    const handleSecondPopUpClose = () => {
        setShowSecondPopUp(false);
    };

    const handleCoursesSelect = (e) => {
        setCoursesPerSem(+e.target.value);
        setShowSecondPopUp(false);
    };

    const handleNext = () => {
        if (!degree || !major) {
            setErrorMessage('Please select both degree and major before continuing.');
            return;
        } 
        //console.log(degree);
        navigate('/plan', { state: { degree, major, coursesPerSem, completedCourses } });
    };
	
    return (
		<div className='global'>
           <Tooltip text1="Select your degree and Major, then select how many courses you would like to do per semester"
					text2="4 Courses is considered full-time study."/>
			<div className='main-section'>
                <Text type="h1">Welcome to Program Planner</Text>
                <Text type="h2">Please select your degree and major below</Text>
                <SearchBox
                    id="degree"
                    label="Degree:"
                    options={degreeList}
                    value={degree}
                    onChange={showMajor}
                />
                {degree && (
                    <Dropdown
                        id="major"
                        label="Major:"
                        options={majorList.map(maj => ({ value: maj.major_name, label: maj.major_name }))}
                        value={major}
                        onChange={handleMajorChange}
                    />
                )}
                {errorMessage && <Text type="p" style={{ color: 'red' }}>{errorMessage}</Text>}
                <Button onClick={handleNext} text="Continue" />
            </div>
			{showPopUp && (
                <PopUp 
                    message="How many courses do you plan to take per semester?"
                    options={dropdownOptions}
                    value={coursesPerSem}
                    onClose={handlePopUpClose}
                    onOptionSelect={handleCoursesSelect}
                />
            )}
            {showSecondPopUp && (
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

export default Select;
