import React, { useState, useEffect, useContext } from 'react'; // Importing React library
import '../styles/style.css';
import Menu from '../components/Menu'; // Importing the Menu component
import Text from '../components/Text'; // Importing the Text component
import { AppContext } from '../AppContext';

const Profile = () => {
  const { studentId } = useContext(AppContext);
  const [userPlans, setUserPlans] = useState([]);

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

  return (
	<div className='global'>
		<div className='main-section'>
        <Text type="h1">Your Profile</Text>
        <Text type="h2">Welcome to your profile!</Text>
        
        <div className="user-plans">
          {userPlans.length > 0 ? (
            <Text type="h3">Your Generated Plans</Text>,
            userPlans.map((plan, index) => (
              // Someone can do some proper styling here at some point
              // This is a placeholder until the plan data is sorted out
              <div key={index} className="plan-item">
                <Text type="h4">{plan.name}</Text>
                <p>Degree: {plan.degree}</p>
                <p>Major: {plan.major}</p>
              </div>
            ))
          ) : (
            <Text type="h3">No Plans Generated</Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; // Exporting the Profile component as the default export

