/**
 * Checks if the given schedule has any missing dependencies.
 * @param {Object[][]} schedule - a 2D array of courses, where each inner array represents a semester. Each course has the form: course: {code: courseCode, prio: priority, index: index in courseCodeList}. This comes from the client request
 * @param {string[]} changedCourses - an array of course codes, representing the courses to be checked. This comes from the client request
 * @param {Object} dependencyGraph - an adjacency list of courses, where the key is the course and the value is an array of its dependencies. This comes from the algorithmHandler/algorithm
 * @param {string[]} courseArray - an array of all courses. Comes from the algorithm/handler.
 * @returns {boolean | string[][]} false if there are no missing dependencies, a list of missing dependencies otherwise. If returning conflicts, each element is the list of warnings or errors for the given course. Each warning or error can be determined by the 3 letters before the space in the returned string.
 */
const courseMissingDependencyCheck = (schedule, changedCourses, dependencyGraph, courseArray) => {
    //NEED TO CHECK FOLLOWS AS WELL
    //check right semester - done
    //check UOS - done
    //find the changed course - done
        //don't need to check dependencies on the course that got moved later, only need to check follow requirements
    //check that all dependencies exist in previous courses - done
        //use a for loop, from the start up to the changed course
        //structuredClone of the dependency graph index with the given course, remove the dependencies as they are found.
        //completed courses are never added to the graph, so no need to send them here.
    //return false if there are no missing dependencies
    //return a list of missing dependencies for each course otherwise

    //finding which changed course is earlier in the schedule and checking the correct semester
    let conflicts = [[], []];
    let earlyChangedCourse;
    let earlyChangedCourseIndex;
    let changedCourseIndexes = []; //2d Array: [index in changedCourses, index in courseArray]
    for (let i = 0; i < schedule.length && changedCourseIndexes.length < 2; i++) {
        const semester = schedule[i];
        for (let j = 0; j < semester.length && changedCourseIndexes.length < 2; j++) {
            const course = semester[j];
            if (!course) continue; //since there can be null courses
            if (changedCourses.includes(course.code)) {
                if (!earlyChangedCourse) {
                    earlyChangedCourse = course;
                    earlyChangedCourseIndex = changedCourses.indexOf(course.code);
                }
                changedCourseIndexes.push([changedCourses.indexOf(course.code), course]);
                //checking semester offering
                let semester_offered = courseArray[course.index].semester_offered;
                if ((!(semester_offered === 0))&&((semester_offered+ i) % 2 === 0)) {
                    //the course will either be the first course added or the second and since they are pushed not set, can just check the length of the array
                    if (changedCourseIndexes.length === 1) conflicts[changedCourseIndexes[0][0]].push("sem");
                    else conflicts[changedCourseIndexes[1][0]].push("sem");
                }
                if (course.us) {
                    let currentUnits = i * semester.length; //if the plan started in semester 2, will need to account for that. Will also need to account for the completed courses.
                    if (currentUnits < course.us) {
                        if (changedCourseIndexes.length === 1) conflicts[changedCourseIndexes[0][0]].push("uos");
                        else conflicts[changedCourseIndexes[1][0]].push("uos");
                    }
                }
            }
        }
    }  

    let dependencies = structuredClone(dependencyGraph[earlyChangedCourse.index]);

    //checking all dependencies are met for the changed course
    for (let i = 0; i < schedule.length && dependencies.length > 0; i++) {
        const semester = schedule[i];
        if (semester.includes(earlyChangedCourse)) break;
        for (let j = 0; j < semester.length; j++) {
            const course = semester[j];
            if (!course) continue; //since there can be null courses
            if (dependencies.includes(course.index)) {
                dependencies.splice(dependencies.indexOf(course.index), 1);
            }
        }
    }

    //if there are any unmet dependencies, add them to the conflicts list
    if (dependencies.length > 0) {
        dependencies.forEach(dependency => {
            //if the conflict is a prereq, it needs to be a higher warning than just an assumed knowledge so provide a way to differentiate
            if (courseArray[earlyChangedCourse.index].requisites.includes(dependency)) conflicts[earlyChangedCourseIndex].push("req " + courseArray[dependency]._id);
            else conflicts[earlyChangedCourseIndex].push("ass " +courseArray[dependency]._id);
        });
    }

    //checking course following stuff
    changedCourses.forEach((courseCode, index) => {
        for (let i = 0; i < courseArray.length; i++) {
            const course = courseArray[i];
            if (course._id === courseCode && course.course_follow !== "") conflicts[index].push("fol "+courseCode); //check if the course has a follower course
            if (course.course_follow === courseCode) conflicts[index].push("fol "+courseCode); //check if the course is a follower course
        }
    });

    if (conflicts.length === 0) return false;
    else return conflicts;

}

export default courseMissingDependencyCheck;