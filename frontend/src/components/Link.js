import React from 'react'; // Importing React to use JSX and other React features
import { Link as RouterLink } from 'react-router-dom'; // Importing Link from 'react-router-dom' and renaming it to RouterLink

const Link = ({ to, text, style, className, external, ...props }) => { // Defining a functional component named Link with props: to, text, style, className, external, and any additional props
  if (external) { // Checking if the link should be external
    return (
      <a
        href={to} // Setting the href attribute to the 'to' prop for the external link destination
        target="_blank" // Opening the link in a new tab
        rel="noopener noreferrer" // Providing security measures for external links
        style={{
          textDecoration: 'none', // Removing underline from the link
          color: '#007bff', // Setting the link color to a blue shade
          ...style // Applying any additional styles passed via the 'style' prop
        }}
        className={className} // Setting the className if provided
        {...props} // Spreading any additional props onto the <a> element
      >
        {text} {/* Rendering the link text */}
      </a>
    );
  }

  return (
    <RouterLink
      to={to} // Setting the 'to' prop for internal routing with React Router
      style={{
        textDecoration: 'none', // Removing underline from the link
        color: '#007bff', // Setting the link color to a blue shade
        ...style // Applying any additional styles passed via the 'style' prop
      }}
      className={className} // Setting the className if provided
      {...props} // Spreading any additional props onto the RouterLink component
    >
      {text} {/* Rendering the link text */}
    </RouterLink>
  );
};

export default Link; // Exporting the Link component as the default export


