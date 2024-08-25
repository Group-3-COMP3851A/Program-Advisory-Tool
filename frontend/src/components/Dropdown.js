import React from 'react';

const Dropdown = ({ id, label, options, value, onChange }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      {label && <label htmlFor={id} style={{ display: 'block', marginBottom: '8px' }}>{label}</label>}
      <select
        id={id}
        value={value}
        onChange={onChange}
        style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        <option value="">--Select--</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
