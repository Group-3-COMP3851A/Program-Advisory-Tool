import React from 'react'; // Importing React to use JSX and other React features
import { Link as RouterLink } from 'react-router-dom'; // Importing Link from 'react-router-dom' and renaming it to RouterLink
//import '../styles/Link.css';

const Link = ({ to, text, external}) => { // Defining a functional component named Link with props: to, text, style, className, external, and any additional props
  if (external) { // Checking if the link should be external
    return (
      <a
        href={to} // Setting the href attribute to the 'to' prop for the external link destination
        target="_blank" // Opening the link in a new tab
        rel="noopener noreferrer" // Providing security measures for external links
      >
        {text}
      </a>
    );
  }

  return (
    <RouterLink
      to={to} // Setting the 'to' prop for internal routing with React Router
    >
      {text}
    </RouterLink>
  );
};

export default Link; // Exporting the Link component as the default export


