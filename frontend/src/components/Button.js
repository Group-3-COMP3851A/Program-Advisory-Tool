import React from 'react'; // Importing React to use JSX and other React features

const Button = ({ onClick, text, color }) => { // Defining a functional component named Button that accepts onClick, text, and color as props
  return (
    <button
      onClick={onClick} // Assigning the onClick handler to the button's onClick event
      style={{
        padding: '10px 20px', // Setting the padding around the button's text
        fontSize: '16px', // Setting the font size of the button's text
        borderRadius: '4px', // Rounding the corners of the button
        border: 'none', // Removing the default border of the button
        backgroundColor: color || '#007bff', // Setting the background color of the button, defaulting to blue if no color is provided
        color: '#fff', // Setting the text color to white
        cursor: 'pointer', // Changing the cursor to a pointer when hovering over the button
      }}
    >
      {text} {/* Displaying the text passed as a prop inside the button */}
    </button>
  );
};

export default Button; // Exporting the Button component as the default export
