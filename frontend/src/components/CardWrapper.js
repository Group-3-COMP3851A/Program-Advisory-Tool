// Editted by Muhammad 19/10/24: added class to control with css
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useContext } from "react";
import { AppContext } from '../AppContext';

export function CardWrapper(props) {
    const { coursesPerSem } = useContext(AppContext);
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.id, disabled: props.disabled });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        '--courses-per-sem': coursesPerSem || 4, // Dynamically set based on number of courses
        margin: '0.5rem',
    };

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="card-wrapper">
            {props.children}
        </div>
    );
}
