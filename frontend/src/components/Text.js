import React from 'react'; // Import React to use JSX and React features

const Text = ({ type, children, style }) => { // Define the Text functional component with props
  const textStyles = { // Define a set of default styles for different text types
    h1: { fontSize: '2.5rem', fontWeight: 'bold' }, // Styles for <h1> text
    h2: { fontSize: '2rem', fontWeight: 'bold' }, // Styles for <h2> text
    h3: { fontSize: '1.75rem', fontWeight: 'bold' }, // Styles for <h3> text
    p: { fontSize: '1rem', lineHeight: '1.5' }, // Styles for <p> (paragraph) text
    span: { fontSize: '1rem' }, // Styles for <span> text
  };

  const Tag = type || 'p'; // Determine the HTML tag to use, default to <p> if type is not provided
  return (
    // TODO: Figure what to do regarding fonts :/
    <Tag style={{ ...textStyles[Tag], ...style, fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'}}> 
      {children}
    </Tag>
  );
};

export default Text; // Export the Text component as the default export
