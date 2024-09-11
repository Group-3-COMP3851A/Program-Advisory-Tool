import React from 'react'; // Importing React to use JSX and other React features
import { useDraggable } from '@dnd-kit/core'
import { rectSwappingStrategy, SortableContext } from '@dnd-kit/sortable';

const DropArea = (props) => { // Defining a functional component named DropArea that accepts children as a prop
  // console.log(props.items);
  return (
    <SortableContext 
      items={props.items.map((item, i) => item._id ? item._id : item.code + props.semesterIndex)}
      strategy={rectSwappingStrategy}
    > {/*passing items to SortableContext */}
        {props.children}
    </SortableContext>
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




