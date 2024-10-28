import React from 'react'; 
import Text from './Text'; 
import Button from './Button'; 
import Dropdown from './Dropdown'; 
import '../styles/style.css';

const PopUp = ({ message, options, value, onClose, onConfirmYes, onConfirmNo, onOptionSelect, errorMessage, isSavePlan}) => {
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

      {isSavePlan && (
        <input
          type="text"
          value={value}
          onChange={onOptionSelect}
          placeholder="Enter Plan Name"
          className="popup-input"
          style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '20px' }}
        />
      )}

      {isSavePlan && errorMessage && (
        <Text type="p" className="error-message">
          {errorMessage} 
        </Text>
      )}

      <div className="popup-buttons">
        {onConfirmYes && !isSavePlan && ( 
          <Button
            onClick={onConfirmYes} 
            text="Yes" 
            color="#28a745" 
            className="popup-button" 
          />
        )}
        {onConfirmNo && !isSavePlan && ( 
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
        {onConfirmYes && isSavePlan && ( 
          <Button
            onClick={onConfirmYes} 
            text="Save" 
            color="#28a745" 
            className="popup-button" 
          />
        )}
        {onConfirmNo && isSavePlan && ( 
          <Button
            onClick={onConfirmNo} 
            text="Cancel" 
            color="#dc3545" 
            className="popup-button" 
          />
        )}
      </div>
    </div>
  );
};

export default PopUp; // Export the PopUp component as the default export
