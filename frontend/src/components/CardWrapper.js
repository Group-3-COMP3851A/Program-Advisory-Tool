import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useContext } from "react";
import { AppContext } from '../AppContext';

export function CardWrapper(props) {
    let { coursesPerSem } = useContext(AppContext);
        if (!coursesPerSem) {
            coursesPerSem = localStorage.getItem('coursesPerSem');
        } else localStorage.setItem('coursesPerSem', coursesPerSem);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({id: props.id, disabled: props.disabled});
    
      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        width: `${100/coursesPerSem}%`, margin: '1%'
      }
      if (!props.children) {
        style.width = "100%";
        style.height = "150px";
      }

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style} >
            {props.children}
        </div>
    )
}

