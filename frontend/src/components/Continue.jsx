import React from 'react';
import '../styles/navigation.css';

const Continue = ({ isEnabled, onClick }) => {
  return (

    <button
      onClick={onClick}
      classnName={isEnabled ? 'button-enabled' : 'button-disabled'}
      disabled={!isEnabled}>
      Continue
    </button>
  )
}
export default Continue;