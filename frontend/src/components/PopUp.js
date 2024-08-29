import React from 'react'; // Import React to use JSX and React features
import Text from './Text'; // Import the Text component for rendering text elements
import Button from './Button'; // Import the Button component for rendering buttons
import Dropdown from './Dropdown'; // Import the Dropdown component for rendering a dropdown menu

const PopUp = ({ message, options, onClose, onConfirmYes, onConfirmNo, onOptionSelect }) => { // Define the PopUp functional component with props
  return (
    <div style={{
      position: 'fixed', // Fix the position of the popup relative to the viewport
      top: '50%', // Center the popup vertically
      left: '50%', // Center the popup horizontally
      transform: 'translate(-50%, -50%)', // Adjust the position to truly center the popup
      padding: '20px', // Add padding inside the popup
      backgroundColor: '#fff', // Set the background color of the popup to white
      border: '1px solid #ccc', // Add a light gray border around the popup
      borderRadius: '8px', // Round the corners of the popup
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Add a subtle shadow to the popup
      zIndex: 1000, // Ensure the popup appears above other elements
    }}>
      <Text type="h3" style={{ marginBottom: '20px' }}>
        {message} 
      </Text>
      
      {options && ( // Conditionally render the Dropdown if options are provided
        <Dropdown
          id="courses-dropdown" // Assign a unique ID to the dropdown
          label="Select number of courses:" // Set the label for the dropdown
          options={options} // Pass the options to the Dropdown component
          onChange={onOptionSelect} // Handle option selection with the provided function
        />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        {onConfirmYes && ( // Conditionally render the "Yes" button if onConfirmYes is provided
          <Button
            onClick={onConfirmYes} // Set the onClick handler to the provided function
            text="Yes" // Set the button text to "Yes"
            color="#28a745" // Set the button color to green
            style={{ marginRight: '10px' }} // Add margin to the right of the button
          />
        )}
        {onConfirmNo && ( // Conditionally render the "No" button if onConfirmNo is provided
          <Button
            onClick={onConfirmNo} // Set the onClick handler to the provided function
            text="No" // Set the button text to "No"
            color="#dc3545" // Set the button color to red
          />
        )}
        {!onConfirmYes && !onConfirmNo && ( // Render the "Close" button if neither onConfirmYes nor onConfirmNo are provided
          <Button
            onClick={onClose} // Set the onClick handler to the provided function
            text="Close" // Set the button text to "Close"
            color="#007bff" // Set the button color to blue
          />
        )}
      </div>
    </div>
  );
};

export default PopUp; // Export the PopUp component as the default export

