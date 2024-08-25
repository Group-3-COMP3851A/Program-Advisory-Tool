import React from 'react';
import Text from './Text'; // Import Text component
import Button from './Button'; // Import Button component
import Dropdown from './Dropdown'; // Import Dropdown component

const PopUp = ({ message, options, onClose, onConfirmYes, onConfirmNo, onOptionSelect }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
    }}>
      <Text type="h3" style={{ marginBottom: '20px' }}>
        {message}
      </Text>
      
      {options && (
        <Dropdown
          id="courses-dropdown"
          label="Select number of courses:"
          options={options}
          onChange={onOptionSelect}
        />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        {onConfirmYes && (
          <Button
            onClick={onConfirmYes}
            text="Yes"
            color="#28a745" // Green color for confirmation
            style={{ marginRight: '10px' }} // Add margin between buttons
          />
        )}
        {onConfirmNo && (
          <Button
            onClick={onConfirmNo}
            text="No"
            color="#dc3545" // Red color for cancel
          />
        )}
        {!onConfirmYes && !onConfirmNo && (
          <Button
            onClick={onClose}
            text="Close"
            color="#007bff" // Blue color for close
          />
        )}
      </div>
    </div>
  );
};

export default PopUp;

