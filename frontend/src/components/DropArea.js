import React from 'react';
import { rectSwappingStrategy, SortableContext } from '@dnd-kit/sortable';

const DropArea = (props) => {
  // Log the items for debugging purposes
  // console.log(props.items);

  return (
    <SortableContext 
      items={props.items.map((item, i) => item._id ? item._id : item.code + item.number)}
      strategy={rectSwappingStrategy}
    >
      {/* Render children components within the SortableContext */}
      {props.children}
    </SortableContext>
  );
};

const dropAreaStyle = {
  minHeight: '200px',
  width: '100%',
  border: '1px solid #ccc',
  borderRadius: '4px',
  padding: '16px',
  flex: 1, 
  display: 'flex', 
  flexDirection: 'row', 
  alignItems: 'center'
};

export default DropArea;
