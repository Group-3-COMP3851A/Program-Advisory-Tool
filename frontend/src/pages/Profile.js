import React, { useState, useEffect, useContext } from 'react'; // Importing React library
import '../styles/style.css';
import Menu from '../components/Menu'; // Importing the Menu component
import Text from '../components/Text'; // Importing the Text component
import { AppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { studentId } = useContext(AppContext);
  const [userPlans, setUserPlans] = useState([]);
  const navigate = useNavigate();

  const getUserPlans = (studentId) => {
    fetch('http://localhost:3001/api/student/getUserPlans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId
      }),
  })
  .then(response => response.json())
  .then(data => setUserPlans(data.plans || []))
  .catch((error) => console.error('Error:', error));
  }

  useEffect(() => {
    getUserPlans(studentId);
  }, [studentId]);

  const handlePlanSelect = (degree, major, courseMap) => {
    navigate('/plan', { state: { degree, major, courseMap } });
  };

  const handleRemovePlan = async (planName) => {
    try {
      const response = await fetch('http://localhost:3001/api/student/removePlanFromUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            studentId, 
            planName,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove plan');
      }

      const result = await response.json();
      
      getUserPlans(studentId);

      return result;
    } catch (error) {
      throw error;
    }
  }

  return (
	<div className='global'>
		<div className='main-section'>
        <Text type="h1">Your Profile</Text>
        <Text type="h2">Welcome to your profile!</Text>
        
        <div className="user-plans">
          {userPlans.length > 0 ? (
            <Text type="h3">Your Generated Plans</Text>,
            <div className='selected-courses scrollable'>
              {userPlans.map((plan, index) => (
              // Someone can do some proper styling here at some point
              // Fix 
              <div key={index} className='selected-course-item' onClick={() => handlePlanSelect(plan.degree, plan.major, plan.courseMap)}>
                  <ul className='cm-ul'>
                      <li className='course-row'>
                          <div className='course-id'>
                              <span>{plan.name}:</span>
                          </div>
                          <span className='course-name'>{plan.degree} - {plan.major}</span>
                          <div className='course-details'>
                              <button className='remove-btn' onClick={() => handleRemovePlan(plan.name)}>✕</button>
                          </div>
                      </li>
                  </ul>
              </div>
            ))}
            </div>
          ) : (
            <Text type="h3">No Plans Generated</Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; // Exporting the Profile component as the default export

