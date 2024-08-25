import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Link = ({ to, text, style, className, external, ...props }) => {
  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: 'none',
          color: '#007bff',
          ...style
        }}
        className={className}
        {...props}
      >
        {text}
      </a>
    );
  }

  return (
    <RouterLink
      to={to}
      style={{
        textDecoration: 'none',
        color: '#007bff',
        ...style
      }}
      className={className}
      {...props}
    >
      {text}
    </RouterLink>
  );
};

export default Link;

