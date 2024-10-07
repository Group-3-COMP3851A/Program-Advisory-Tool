import React, { useState } from 'react'; // Importing React library
import '../styles/style.css';
import Menu from '../components/Menu'; // Importing the Menu component
import Text from '../components/Text'; // Importing the Text component

const Profile = () => {
  const [userPlans, setUserPlans] = useState([]);

  // TODO: Add functional API request to get plans (Use the studentId to pull this information from the database)

  return (
	<div className='global'>
		<div className='main-section'>
        <Text type="h1">Your Profile</Text>
        <Text type="h2">Welcome to your profile!</Text>
        
        <div className="user-plans">
          {userPlans.length > 0 ? (
            <Text type="h3">Your Generated Plans</Text>,
            userPlans.map((plan, index) => (
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

