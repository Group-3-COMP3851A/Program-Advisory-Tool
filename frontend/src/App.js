import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  // TODO: Maybe add test to check if the backend can receive data from the frontend?
  // This is just a test message to show that the backend is running, and is able to send data to the frontend
  const [message, setMessage] = useState('');

  useEffect(() => {

    // TODO: Remove the need to expose the port to the client, this information should be as hidden as possible
    fetch('http://localhost:3001/api')

      // Issues a response to the backend, polling for a specific test string
      .then(response => response.text())

      // Sets the data received from the backend to equal the test message
      .then(data => setMessage(data));
  }, []);

  // TODO: Add Figma Prototype UI
  // This will be replaced with our own converted HTML
  // Ideally this should be structured into separate folders for each page
  return (
    <div className="App">
      <header className="App-header">
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;
