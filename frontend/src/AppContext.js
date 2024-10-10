// This will probably get moved at some point. Will discuss an appropriate location at a later date

import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [degree, setDegree] = useState('');
    const [major, setMajor] = useState('');
    const [coursesPerSem, setCoursesPerSem] = useState(4);
    const [completedCourses, setCompletedCourses] = useState([]);

    return (
        <AppContext.Provider value={{ 
            degree, setDegree, 
            major, setMajor, 
            coursesPerSem, setCoursesPerSem,
            completedCourses, setCompletedCourses 
            }}>
            {children}
        </AppContext.Provider>
    );
};