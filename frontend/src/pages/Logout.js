import React, { useState } from 'react';
import Text from '../components/Text';
import Menu from '../components/Menu';
import Button from '../components/Button';
import Form from '../components/Form';

const Logout = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    // Add your login logic here
  };

  return (
    <div style={{ display: 'flex' }}>
      <Menu />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <Text type="h1">Log In</Text>
        <Text type="h2">Please enter your details to log in</Text>
        
        {/* Combined Login Form */}
        <Form onSubmit={handleLoginSubmit}>
          <Text type="h3">Username</Text>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '20px' }}
          />
          <Text type="h3">Password</Text>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '20px' }}
          />
          <Button text="Log In" />
        </Form>
      </div>
    </div>
  );
};

export default Logout;

