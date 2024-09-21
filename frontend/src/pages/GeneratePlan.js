import React, { useState, useEffect } from 'react';
import '../styles/style.css';
import OutlinedCard from '../components/Card';
import DropArea from '../components/DropArea';
import Text from '../components/Text';
import Menu from '../components/Menu';
import Button from '../components/Button';
import { useNavigate, useLocation } from 'react-router-dom';

const GeneratePlan = () => {
    const location = useLocation();
    const { degree, major, semCount, coursesPerSem } = location.state || {};
    const [courseList, setCourseList] = useState([]);
    const navigate = useNavigate();

    const getCourseList = (degree, major, semCount, coursesPerSem) => {
        fetch('http://localhost:3001/api/algorithm/getCourseList', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studentId: 12345,
            degree,
            major,
            semCount,
            coursesPerSem
          }),
          })
          .then(response => response.json())
          .then(data => {
            setCourseList(data.courseList || []);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }

    useEffect(() => {
        getCourseList(degree, major, semCount, coursesPerSem);
    }, [coursesPerSem, degree, major, semCount]);

    const handleEditClick = () => {
        navigate('/view-planner');
    };

    return (
		
			<div className='gen-section'>
                <Text type="h1" className="heading">Course Plan for {major} Major</Text>
                <Button onClick={handleEditClick} text="Edit" color="#007bff" className="edit-button" />
                {Object.keys(courseList).map((year, yearIndex) => (
                    <div key={yearIndex} className='year-section'>
                        <div className='year-title'>
                            <Text type="h2" className="year-heading">Year {yearIndex + 1}</Text>
                        </div>
                        <div className='semester-section'>
                            <DropArea>
                                {Object.keys(courseList[yearIndex]).map((semester, semesterIndex) => (
                                    <div key={semesterIndex} className='semester-column'>
                                        <div className='semester-title'>
                                            <Text type="h3" className="semester-heading">Semester {semesterIndex + 1}</Text>
                                        </div>
                                        <div className='courses-container'>
                                            <DropArea>
                                                {courseList[yearIndex][semesterIndex].map((course, i) => (
                                                    <OutlinedCard key={course._id + i.toString()} text={course} />
                                                ))}
                                            </DropArea>
                                        </div>
                                    </div>
                                ))}
                            </DropArea>
                        </div>
                    </div>
                ))}
            </div>
        
    );
};

export default GeneratePlan;
