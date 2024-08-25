import React from 'react';
import Text from '../components/Text';
import Menu from '../components/Menu';

const AskUon = () => {
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

export default AskUon;
