import React from 'react'; 
import Text from './Text'; 
import Button from './Button'; 
import Dropdown from './Dropdown'; 
import '../styles/style.css';

const PopUp = ({ message, options, value, onClose, onConfirmYes, onConfirmNo, onOptionSelect }) => {
  return (
    <div className="popup">
      <Text type="h3" className="popup-message">
        {message} 
      </Text>
      
      {options && ( 
        <Dropdown
          id="courses-dropdown"
          label="Select number of courses:" 
          value={value}
          options={options} 
          onChange={onOptionSelect} 
        />
      )}

      <div className="popup-buttons">
        {onConfirmYes && ( 
          <Button
            onClick={onConfirmYes} 
            text="Yes" 
            color="#28a745" 
            className="popup-button" 
          />
        )}
        {onConfirmNo && ( 
          <Button
            onClick={onConfirmNo} 
            text="No" 
            color="#dc3545" 
            className="popup-button" 
          />
        )}
        {!onConfirmYes && !onConfirmNo && (
          <Button
            onClick={onClose} 
            text="Close" 
            color="#007bff" 
            className="popup-button" 
          />
        )}
      </div>
    </div>
  );
};

export default PopUp; // Export the PopUp component as the default export
