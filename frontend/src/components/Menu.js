import React from "react"; // Importing React to use JSX and other React features
import Logo from "../assets/a.logo.png"; // Importing the logo image from the specified path

function Menu() { // Defining a functional component named Menu
  return (
    <div className="menu"> {/* Creating a div element with the class 'menu' */}
      <img 
        style={{ 
          width: 326, // Setting the width of the image to 326 pixels
          height: 234, // Setting the height of the image to 234 pixels
          left: 8, // Setting the left position of the image to 8 pixels
          top: 20, // Setting the top position of the image to 20 pixels
          position: 'absolute', // Positioning the image absolutely within its containing element
          borderRadius: 7 // Applying a border radius of 7 pixels to the image for rounded corners
        }} 
        src={Logo} // Setting the source of the image to the imported Logo
        alt="uon" // Providing an alt text for the image to describe its content
      />
    </div>
  )
}

export default Menu; // Exporting the Menu component as the default export
