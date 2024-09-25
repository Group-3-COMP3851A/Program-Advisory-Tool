//when a course is added into a new semester, need to check that everything is fine with the swap
//does courseArray need to be regenerated - yes probably
    //when checking requisites and stuff, should check them from the updated version of the array
//need to check:
    //Correct Semester on changed course
    //UOS   
        //will need to check if other course's uos are met
        //check if the changed courses' uos is met
    //Direct Follow Requirements
        //check if the changed course has a follow requirement
        //check if any courses previously had a follow requirement
    //Dependencies 
        //need to check if other courses are dependant on the moved course - only matters if moving the course to a later semester
        //check if all the changed courses' dependencies are met
//probably need to retrieve a new version of the courseArray from the db.
//changed course should be the entire course object
//old schedule should be sent with the course
//the schedule can contain directed placeholders and null spaces (for completed courses)

//directed placeholders will also need to be fetched from the db, will require degree and major to be known (somehow)
//need to have some kind of logic to check for a directed placeholder being swapped as well
    //probably make this another function
    //if a directed is moved into the wrong semester, check if the other directed is in the opposite semester and if so, don't show a conflict

//electives need another function
    //only checks required for this is making sure that UOS for other courses is satisfied

//destination and source semester positions can be sent and checked against
    //for changed course info:
        //check if the dest semester is valid - wrong semester = conflict - done
        //check all courses up to the destination semester for dependencies, anything missing is a conflict - done
        //check the semester before for any courses with a follow requirement on the changed course - outside of loop - done
        //check if the changed course has a follow requirement that is satisfied - outside of loop - done
        //check that the number of courses between the start of plan and the destination course satisfies the uos (can be done at the same time as dependencies) - done

    //for other courses:
        //check if there any courses before (and including) the destination semester that are dependent on the changed course - if so add a conflict - done
        //check if any course between the source semester and destination semester has a units of study requirement that is no longer met - done

/**
 * Inserts checks for normal course dependencies
 * @param {Array} newSchedule the entire plan
 * @param {Object} changedCourse the course that has been changed
 * @param {Object} sourceLocation the original location of the changed course
 * @param {Object} destinationLocation the new location of the changed course
 * @param {Array} courseArray all the courses in the plan
 * @returns {Array} an array of conflicts, each element is an array of 2 elements: the first is a string describing the type of conflict, the second is an array of the courses that are in conflict
 */
const insertNormalCourseDependencyCheck = (newSchedule, changedCourse, sourceLocation, destinationLocation, courseArray) => {
    //update the schedule with the new information from the db in case anything has changed
    updateCourses(newSchedule, courseArray, changedCourse);
    //locations are in the form: {semesterIndex: num, yearIndex: num}
    //finding if there are any requisites for units of study
    let us;
    for (let i = 0; i < changedCourse.assumed_knowledge.length; i++) {
        const assumed = changedCourse.assumed_knowledge[i];
        if (assumed.substring(assumed.length-2, assumed.length) === "us") { //units of study requirements are stored as "xxxus"
            us = parseInt(assumed.substring(0, assumed.length-2));
            break;
        } else {us = false;};
    };

    //dependencies[0] is assumed knowledge
    //dependencies[1] is requisites 
    const dependencies = [[], []];

    //create array with all dependencies - this is maybe not as efficient as
    changedCourse.assumed_knowledge.forEach(assumed => {
        if (Array.isArray(assumed)) dependencies[0].push(assumed);
        else if (assumed.substring(assumed.length-2, assumed.length) !== "us") {
            dependencies[0].push(assumed);
        }
    });
    changedCourse.requisites.forEach(requisite => {
        dependencies[1].push(requisite);
    });

    const conflicts = [];
    const coursesBeforeDestination = []; //this will be used when checking the dependencies of other courses to make sure that an optional dependency array is satisfied or not
    //2 different units of study variables, one to keep track of every course found, another to keep track of how many units would have been studied up until the given semester
    let unitsStudied = 0;
    let unitsStudiedBeforeSem = 0;

    //checking if the semester is valid
    //if the semester can be either 1 or 2 or if the semester matches the sourcelocation semester, there's no issue
    if (!(changedCourse.semester_offered === 0 || destinationLocation.semesterIndex === sourceLocation.semesterIndex)) {
        conflicts.push(["semester"]);
    }

    //dependency and units of study checking for the changed course
    //for loops will search each year and semester up until the destination
        //destination is in the form: {semesterIndex: num, yearIndex: num}
        //since they are both indexes, it is suitable to have the condition to be <=
    for (let i = 0; i <= destinationLocation.yearIndex; i++) {
        const year = newSchedule[i];
        let semestersToCheck;
        //if we are on the correct year, we need only check up to (not including) the destination semester
        //if we are on the wrong year, we need to check all semesters
        if (i === destinationLocation.yearIndex) {
            semestersToCheck = destinationLocation.semesterIndex - 1;
        } else semestersToCheck = 1; //1 is an index so it's actually 2 semesters
        for (let j = 0; j <= semestersToCheck; j++) {
            const semester = year[j];
            for (let k = 0; k < semester.length; k++) {
                const currentCourse = semester[k];
                //if there is a course in this position, check if it is in the dependency list
                if (currentCourse){
                    unitsStudied += 10; //since there is a course here, add it into the units studied
                    //if the current course isn't a directed or elective, check if it's a dependency
                    if (currentCourse._id){
                        coursesBeforeDestination.push(currentCourse._id);
                        for (let m = 0; m < dependencies.length; m++) {
                            const dependencyCategory = dependencies[m]; //check for req or assumed
                            for (let n = 0; n < dependencyCategory.length; n++) {
                                const dependency = dependencyCategory[n];
                                if (Array.isArray(dependency) && dependency.includes(currentCourse._id)) {
                                    dependencyCategory.splice(n, 1);
                                    n--;
                                }
                                else if (dependency === currentCourse._id) {
                                    dependencyCategory.splice(n, 1);
                                    n--;
                                }
                            }
                        }
                    }
                }
            }
            unitsStudiedBeforeSem = unitsStudied;
        }
    }

    //check the UOS matches up
    if (us) {
        if (unitsStudiedBeforeSem < us) {
            conflicts.push(["uos"]);
        }
    }

    //checking if there are any dependencies left in the array and, if so, whether they are assumed knowledge or requisites
    const depCats = ["ass", "req"]; //dependency categories
    for (let i = 0; i < dependencies.length; i++) {
        const dependencyCategory = dependencies[i];
        dependencyCategory.forEach(dependency => {
            conflicts[i].push([[depCats[i]], [dependency]]); //if there is anything left in this category, it needs to be warned about
        });
    };

    //checking if there are any deps in the same semester
    // for (let i = 0; i < depsInSem.length; i++) {
    //     const dependencyCategory = depsInSem[i];
    //     dependencyCategory.forEach(dependency => {
    //         conflicts[i].push([[depCats[i]], [dependency]]); //if there is anything left in this category, it needs to be warned about
    //     });
    // };

    //only if it is possible to have a previous semester must we check if there is a follow constraint
    if ((sourceLocation.yearIndex === 0 && sourceLocation.semesterIndex === 1) || sourceLocation.yearIndex > 0) {
        let prevLocation;
        //determining the previous location, if the semesterIndex is 0 then the year must go back 1, otherwise just drop the semesterIndex by 1
        if (sourceLocation.semesterIndex === 0) prevLocation = {yearIndex: sourceLocation.yearIndex - 1, semesterIndex: 1};
        else prevLocation = {yearIndex: sourceLocation.yearIndex, semesterIndex: sourceLocation.semesterIndex - 1};

        const prevSemester = newSchedule[prevLocation.yearIndex][prevLocation.semesterIndex]
        //checking each course in the prev semester for any follows requirements on the changedCourse
        prevSemester.forEach(course => {
            if (course && course._id && course.course_follow === changedCourse._id) conflicts.push([["following"], [course._id]]) 
        })
    }

    //checking that any follower courses are present
    if (changedCourse.course_follow) {
        let nextLocation;
        if (destinationLocation.semesterIndex === 1) nextLocation = {yearIndex: destinationLocation.yearIndex + 1, semesterIndex: 0};
        else nextLocation = {yearIndex: destinationLocation.yearIndex, semesterIndex: 1};
        //if the next semester does not exist then can just return the conflict straight away
        if (nextLocation.yearIndex > newSchedule.length) conflicts.push([["follower"], [changedCourse.course_follow]]);
        else {
            const nextSemester = newSchedule[nextLocation.yearIndex][nextLocation.semesterIndex]
            //map the semester's courses to just be a list of the course id's
            const coursesInNextSemester = nextSemester.map(course => {
                if (course && course._id) return course._id
                else return undefined //directed and elective cannot be followers
            })
            //if the course we need to see as a follower is not present, add it as a conflict
            if (!(coursesInNextSemester.includes(changedCourse.course_follow))) conflicts.push([["follower"], [changedCourse.course_follow]]);
        }
    }

    //------------------------------------END OF CHANGEDCOURSE CHECKING------------------------------------------------
    //checking the other courses for any reliance on changedcourse that is now missing

    //checking for any courses that have a dependency on the moved course
    for (let i = 0; i <= destinationLocation.yearIndex; i++) {
        const year = newSchedule[i];
        let semestersToCheck;
        if (i === destinationLocation.yearIndex) {
            semestersToCheck = destinationLocation.semesterIndex;
        } else semestersToCheck = 1; //1 is an index so it's actually 2 semesters
        for (let j = 0; j <= semestersToCheck; j++) {
            const semester = year[j];
            semester.forEach(course => {
                if (course && course._id){ //skip any null or undefined values to not cause errors
                    //checking assumed knowledge
                    course.assumed_knowledge.forEach(assumed => {
                        //assumed.find(item => coursesBeforeDestination.includes(item)) will check if anything in coursesBeforeDestination matches anything from assumed 
                        //i.e checking if another course has satisfied the dependency
                        if (
                            Array.isArray(assumed) &&
                            assumed.includes(changedCourse._id) &&
                            !assumed.find((item) =>
                                coursesBeforeDestination.includes(item)
                            )
                        )
                            conflicts.push([["relianceKnowledge"], [course._id]]);
                        else if (assumed === changedCourse._id)
                            conflicts.push([["relianceKnowledge"], [course._id]]);
                    });
                    //checking requisites
                    course.requisites.forEach(requisite => {
                        if (requisite === course._id) conflicts.push([["relianceRequisite"], [course._id]]);
                    });
                }
            })
        }
    }
    
    unitsStudied = 0;
    unitsStudiedBeforeSem = 0;

    //check units of study requirements that may not be met for course between source and destination
    //only need to check this if the course is being moved back in the plan
    //if a course is being moved forward, everything behind it will still have the same number of completed courses
    if (
        destinationLocation.yearIndex > sourceLocation.yearIndex ||
        (destinationLocation.yearIndex === sourceLocation.yearIndex &&
            destinationLocation.semesterIndex > sourceLocation.semesterIndex)
    ) {
        for (let i = 0; i <= destinationLocation.yearIndex; i++) {
            const year = newSchedule[i];
            let maxSemester;
            //make sure we stay within the boundary of the dest-source
            if (i === destinationLocation.yearIndex) maxSemester = destinationLocation.semesterIndex
            else maxSemester = 1
            for (let j = 0; j <= maxSemester ; j++) {
                const semester = year[j]
                for (let k = 0; k < semester.length; k++) {
                    const course = semester[k];
                    //if there is a course in the current position
                    if (course) {
                        if (course._id) {
                            unitsStudied += 10; //count the course as studied
                            course.assumed_knowledge.forEach(assumed => {
                                //if the assumed knowledge is a UOS requirement and the current UOS is less than the required, add a conflict
                                if (!Array.isArray(assumed) && assumed.substring(assumed.length-2) === "us" && parseInt(assumed.substring(assumed.length-2)) < unitsStudiedBeforeSem)
                                    conflicts.push([["uosOther"], [course._id]])
                            })
                        }
                    }
                }
                unitsStudiedBeforeSem = unitsStudied
            }
        }
    }

    return conflicts;

}

//add a way to preserve any existing conflicts
//function will update all the courses with their up-to-date versions from the database.
const updateCourses = (schedule, courseArray, changedCourse) => {
    for (let i = 0; i < schedule.length; i++) {
        const year = schedule[i];
        for (let j = 0; j < year.length; j++) {
            const semester = year[j];
            for (let k = 0; k < semester.length; k++) {
                const currentCourse = semester[k];
                if (currentCourse._id) {
                    let newCourse = courseArray.find(course => course._id === currentCourse._id);
                    if (!newCourse) schedule [i][j][k] = newCourse; //only replace the course if it exists in the array (in the case of a course being deleted or something, the plan should still function)
                }
            }
        }
    }
    let newCourse = courseArray.find(course => course._id === changedCourse._id);
    if (!newCourse) changedCourse = newCourse;
}

export default insertNormalCourseDependencyCheck