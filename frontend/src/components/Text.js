import React from 'react';

const Text = ({ type, children, style }) => {
  const textStyles = {
    h1: { fontSize: '2.5rem', fontWeight: 'bold' },
    h2: { fontSize: '2rem', fontWeight: 'bold' },
    h3: { fontSize: '1.75rem', fontWeight: 'bold' },
    p: { fontSize: '1rem', lineHeight: '1.5' },
    span: { fontSize: '1rem' },
  };

  const Tag = type || 'p'; 
  return (
    <Tag style={{ ...textStyles[Tag], ...style }}>
      {children}
    </Tag>
  );
};

export default Text;
