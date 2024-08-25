import React from 'react';

const Form = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {children}
    </form>
  );
};

export default Form;
