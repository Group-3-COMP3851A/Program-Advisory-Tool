import React from 'react'; // Importing React to use JSX and other React features

const Form = ({ onSubmit, children }) => { // Defining a functional component named Form that accepts props: onSubmit and children
  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}> 
    {/* Creating a form element and attaching the onSubmit event handler to handle form submission; applying inline styles for layout */}
      {children} {/* Rendering the child elements passed to the Form component */}
    </form>
  );
};

export default Form; // Exporting the Form component as the default export

