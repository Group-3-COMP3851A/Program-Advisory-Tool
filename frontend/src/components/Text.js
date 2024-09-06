import React from 'react'; // Import React to use JSX and React features
import '../styles/style.css';

const Text = ({type, children}) => { // Define the Text functional component with props
  const Tag = type || 'p'; // Determine the HTML tag to use, default to <p> if type is not provided
  return (
    <Tag> 
      {children}
    </Tag>
  );
};

export default Text; // Export the Text component as the default export
