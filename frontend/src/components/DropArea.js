import React from 'react'; // Importing React to use JSX and other React features

const DropArea = ({ children }) => { // Defining a functional component named DropArea that accepts children as a prop
  return (
    <div style={dropAreaStyle}> {/* Applying the dropAreaStyle to the outer div */}
        {children} {/* Rendering the children elements passed to the DropArea component */}
    </div>
  );
};

const dropAreaStyle = { // Defining a constant object dropAreaStyle to hold the CSS styles for the outer drop area
  minHeight: '200px', // Setting a minimum height for the drop area to ensure it occupies sufficient space
  width: '100%', // Making the drop area take up the full width of its parent container
  border: '1px solid #ccc', // Adding a solid border with a light gray color around the drop area
  borderRadius: '4px', // Rounding the corners of the drop area
  padding: '16px', // Adding padding inside the drop area to create space between the border and the content
  flex: 1, 
  display: 'flex', 
  flexDirection: 'row', 
  alignItems: 'center'
};

export default DropArea; // Exporting the DropArea component as the default export




