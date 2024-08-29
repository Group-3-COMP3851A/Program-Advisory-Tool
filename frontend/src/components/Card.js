import React from 'react'; // Importing React to use JSX and other React features
import { useDrag } from 'react-dnd'; // later use

const Card = ({ text }) => { // Defining a functional component named Card that accepts text as a prop
  return (
    <div style={cardStyle}> {} 
      {text} {/* Displaying the text passed as a prop inside the card */}
    </div>
  );
};

const cardStyle = { // Defining a constant object cardStyle to hold the CSS styles for the card
  padding: '8px', // Setting padding inside the card to create space around the text
  margin: '4px', // Setting margin outside the card to create space between this card and others
  backgroundColor: '#f0f0f0', // Setting the background color of the card to a light gray
  border: '1px solid #ccc', // Adding a solid border with a light gray color
  borderRadius: '4px', // Rounding the corners of the card
  textAlign: 'center', // Centering the text horizontally within the card
};

export default Card; // Exporting the Card component as the default export









