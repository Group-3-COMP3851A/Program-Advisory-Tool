import React from 'react'; // Importing React to use JSX and other React features

const Dropdown = ({ id, label, options, value, onChange }) => { // Defining a functional component named Dropdown that accepts props: id, label, options, value, and onChange
  return (
    <div style={{ marginBottom: '20px' }}> {/* Applying a bottom margin to the dropdown container for spacing */}
      {label && <label htmlFor={id} style={{ display: 'block', marginBottom: '8px' }}>{label}</label>} 
      {/* Conditionally rendering a label element if a label prop is provided; using the htmlFor attribute to associate the label with the dropdown */}
      <select
        id={id} // Setting the id of the select element to the id prop passed in
        value={value} // Setting the current value of the select element to the value prop
        onChange={onChange} // Attaching the onChange event handler to the select element, which triggers the onChange prop function
        style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }} 
        // Applying inline styles for padding, font size, border radius, and border to style the select element
      >
        <option value="">--Select--</option> {/* Adding a default option for when no option is selected */}
        {options.map((option, index) => ( // Iterating over the options array using the map function to create option elements
          <option key={index} value={option.value}>{option.label}</option> 
          // Setting a unique key for each option based on its index and setting the value and display text from the option object
        ))}
      </select>
    </div>
  );
};

export default Dropdown; // Exporting the Dropdown component as the default export
