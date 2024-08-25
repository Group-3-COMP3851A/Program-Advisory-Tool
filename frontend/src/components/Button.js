import React from 'react';

const Button = ({ onClick, text, color }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: color || '#007bff',
        color: '#fff',
        cursor: 'pointer',
      }}
    >
      {text}
    </button>
  );
};

export default Button;
