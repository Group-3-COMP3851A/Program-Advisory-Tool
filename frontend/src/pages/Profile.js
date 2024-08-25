import React from 'react';
import Menu from '../components/Menu'; 
import Text from '../components/Text'; 

const Profile = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Menu />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <Text type="h1">Profile Page</Text>
        <Text type="h2">Welcome to your profile!</Text>
        {/* Add profile content here */}
      </div>
    </div>
  );
};

export default Profile;
