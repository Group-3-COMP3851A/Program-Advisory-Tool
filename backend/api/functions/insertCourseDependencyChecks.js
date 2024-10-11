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
    
    //Not going to check directed course dependencies because it's really dependant on what course the user actually chooses, if they aren't going to pick a course that requires all the deps, it's useless to show

    //what to loop through the whole array to check:
        //follower/following for courses that aren't the changed course
        //check if there are any conflicts existing?
        //check for correct semester
    
    //realistically, since I am already looping the whole array, I actually don't need the changedCourse specific code at all, I'm just keeping it since it was already there


/**
 * Inserts checks for normal course dependencies
 * @param {Array} newSchedule the entire plan - THIS SCHEDULE NEEDS TO BE SENT BACK TO THE FRONTEND BECAUSE IT CONTAINS ALL THE CONFLICTS
 * @param {Object} changedCourse the course that has been changed
 * @param {Object} sourceLocation the original location of the changed course
 * @param {Object} destinationLocation the new location of the changed course
 * @param {Array} courseArray all the courses in the plan
 * @param {Array} completedCourses All the completed courses that a student has done
 * @returns {Array} an array of conflicts, each element is an array of 2 elements: the first is a string describing the type of conflict, the second is an array of the courses that are in conflict
 * THE NEW SCHEDULE MUST BE SENT TO THE FRONTEND AGAIN.
 * possible conflicts are as follows:
 *      semester: the course is in the wrong semester
 *      uos: the course does not meet uos requirements
 *      ass: the course is missing assumed knowledge
 *      req: the course is missing requisite knowledge
 *      followRequirement: the course has a follower course that is not present in the following semester
 */
export const insertNormalCourseDependencyCheck = (newSchedule, changedCourse, sourceLocation, destinationLocation, courseArray, completedCourses) => {
    //update the schedule with the new information from the db in case anything has changed
    changedCourse = updateCourses(newSchedule, courseArray, changedCourse);

    const completedCourseIds = completedCourses.map(course => course._id);
    //locations are in the form: {semesterIndex: num, yearIndex: num}
    //finding if there are any requisites for units of study
    let us;
    for (let i = 0; i < changedCourse.assumed_knowledge.length; i++) {
        const assumed = changedCourse.assumed_knowledge[i];
        if (!Array.isArray(assumed) && assumed.substring(assumed.length-2, assumed.length) === "us") { //units of study requirements are stored as "xxxus"
            us = parseInt(assumed.substring(0, assumed.length-2));
            break;
        } else {us = false;};
    };

    //dependencies[0] is assumed knowledge
    //dependencies[1] is requisites 
    const dependencies = [[], []];

    //create array with all dependencies - this is maybe not as efficient as it could be
    changedCourse.assumed_knowledge.forEach(assumed => {
        if (Array.isArray(assumed) && !assumed.find((item) => completedCourseIds.includes(item))) dependencies[0].push(assumed); //if there is an array dependency and none of the courses are completed, add it
        else if (!Array.isArray(assumed) && !completedCourseIds.includes(assumed) && assumed.substring(assumed.length-2) !== "us") dependencies[0].push(assumed);
    });
    changedCourse.requisites.forEach(requisite => {
        if (!completedCourseIds.includes(requisite)) dependencies[1].push(requisite);
    });

    const conflicts = [];
    //2 different units of study variables, one to keep track of every course found, another to keep track of how many units would have been studied up until the given semester
    let unitsStudied = completedCourseIds.length*10;
    let unitsStudiedBeforeSem = completedCourseIds.length*10;

    //checking if the semester is valid
    //if the semester can be either 1 or 2 or if the semester matches the sourcelocation semester, there's no issue
    if (!(changedCourse.semester_offered === 0 || changedCourse.semester_offered === destinationLocation.semesterIndex + 1)) {
        conflicts.push(["semester"]);
        changedCourse.conflicts.push(["semester"]);
    }

    console.log(newSchedule)

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
            changedCourse.conflicts.push(["uos", us])
        }
    }

    //checking if there are any dependencies left in the array and, if so, whether they are assumed knowledge or requisites
    const depCats = ["ass", "req"]; //dependency categories
    for (let i = 0; i < dependencies.length; i++) {
        const dependencyCategory = dependencies[i];
        dependencyCategory.forEach(dependency => {
            conflicts.push([depCats[i], dependency]); //if there is anything left in this category, it needs to be warned about
            changedCourse.conflicts.push([depCats[i], dependency])
        });
    };

    //checking that any follower courses are present
    if (changedCourse.course_follow) {
        let nextLocation;
        if (destinationLocation.semesterIndex === 1) nextLocation = {yearIndex: destinationLocation.yearIndex + 1, semesterIndex: 0};
        else nextLocation = {yearIndex: destinationLocation.yearIndex, semesterIndex: 1};
        //if the next semester does not exist then can just return the conflict straight away
        if (nextLocation.yearIndex > newSchedule.length) {
            conflicts.push(["followRequirement", changedCourse.course_follow]);
            changedCourse.conflicts.push(["followRequirement", changedCourse.course_follow]);
        }
        else {
            const nextSemester = newSchedule[nextLocation.yearIndex][nextLocation.semesterIndex]
            //map the semester's courses to just be a list of the course id's
            const coursesInNextSemester = nextSemester.map(course => {
                if (course && course._id) return course._id
                else return undefined //directed and elective cannot be followers
            })
            //if the course we need to see as a follower is not present, add it as a conflict
            if (!(coursesInNextSemester.includes(changedCourse.course_follow))) {
                conflicts.push(["followRequirement", changedCourse.course_follow]);
                changedCourse.conflicts.push(["followRequirement", changedCourse.course_follow]);
            }
        }
    }

    //------------------------------------END OF CHANGEDCOURSE CHECKING------------------------------------------------
    //checking the other courses for any reliance on changedcourse that is now missing
    //this should also check for any other conflicts that may have been resolved
    checkEveryCourse(newSchedule, changedCourse, conflicts, completedCourseIds)

    return newSchedule;

}

//for elective and directed movement checking, can just use the checkallcourses for everything pretty much

export const insertElectiveDependencyChecks = (newSchedule, changedCourse, courseArray, completedCourses) => {
    updateCourses(newSchedule, courseArray, changedCourse);

    const completedCourseIds = completedCourses.map(course => course._id);
    //electives have nothing to check, just need to check every course
    const conflicts = [];
    checkEveryCourse(newSchedule, changedCourse, conflicts, completedCourseIds)
    return newSchedule
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
                    let somecourse = {...newCourse, conflicts: []};
                    if (newCourse) schedule [i][j][k] = somecourse; //only replace the course if it exists in the array (in the case of a course being deleted or something, the plan should still function)
                    else schedule [i][j][k] = {...currentCourse, conflicts: []};
                    if (changedCourse._id && currentCourse._id === changedCourse._id) {
                        if (changedCourse.code) somecourse.code = changedCourse.code //if the course was a directed, make sure we keep that knowledge
                        changedCourse = somecourse;
                    }
                }
            }
        }
    }
    console.log(changedCourse)
    return changedCourse
}

const checkForDependencies = (coursesToPoint, course, conflicts, completedCourseCodes) => {
    course.assumed_knowledge.forEach(assumed => {
        //assumed.find(item => coursesBeforeDestination.includes(item)) will check if anything in coursesBeforeDestination matches anything from assumed 
        //i.e checking if another course has satisfied the dependency
        if (
            Array.isArray(assumed) &&
            !assumed.find((item) =>
                coursesToPoint.includes(item) || completedCourseCodes.includes(item)
            )
        )
            {
                conflicts.push(["ass", course._id]);
                course.conflicts.push(["ass", assumed]);
            }
        else if (!Array.isArray(assumed) && !coursesToPoint.includes(assumed) && !completedCourseCodes.includes(assumed) && !assumed.substring(assumed.length-2) === "us")
        {
            conflicts.push(["ass", course._id]);
            course.conflicts.push(["ass", assumed]);
        }
    });
    //checking requisites
    course.requisites.forEach(requisite => {
        if (!coursesToPoint.includes(assumed) && !completedCourseCodes.includes(assumed)) {
            conflicts.push(["req", course._id]);
            course.conflicts.push(["req", requisite]);}
    });
}

//code to check for a follower course
const checkFollowerCourse = (course, nextSemester, conflicts) => {
    const coursesInNextSemester = nextSemester.map(course => {
        if (course && course._id) return course._id
        else return undefined //directed and elective cannot be followers
    })

    if (!coursesInNextSemester.includes(course.course_follow)) {
        conflicts.push(["followRequirement", course._id]);
        course.conflicts.push(["followRequirement", course.course_follow]);
    }
}

//code to check for UOS requirements
const checkForUOS = (course, unitsStudied, conflicts) => {
    course.assumed_knowledge.forEach(assumed => {
        if (!Array.isArray(assumed) && assumed.substring(assumed.length-2) === "us" && (parseInt(assumed.substring(0, assumed.length-2)) > unitsStudied))
        {
            conflicts.push(["uos", course._id]);
            course.conflicts.push(["uos", parseInt(assumed.substring(0, assumed.length-2))]);
        }
        
    });
}

//code to check for the correct semester
const checkSemester = (course, conflicts, currentSemester) => {
    if (!(course.semester_offered === 0 || course.semester_offered === currentSemester + 1)) {
        conflicts.push(["semester", course]);
        course.conflicts.push(["semester"])
    }
}


//function to check every course in the list's potential conflicts
const checkEveryCourse = (newSchedule, changedCourse, conflicts, completedCourseIds) => {
    const coursesBeforeCurrentSemester = [];
    let coursesInCurrentSemester = [];

    let unitsStudied = completedCourseIds.length*10;
    let unitsStudiedBeforeSem = completedCourseIds.length*10;

    //checking for any courses that have a dependency on the moved course
    for (let i = 0; i < newSchedule.length; i++) {
        const year = newSchedule[i];
        for (let j = 0; j < year.length; j++) {
            const semester = year[j];
            semester.forEach(course => {
                if (course) unitsStudied += 10;
                if (course && course._id){ //skip any null or undefined values to not cause errors
                    //checking assumed knowledge
                    coursesInCurrentSemester.push(course._id);
                    if (course._id !== changedCourse._id) {
                        checkForDependencies(coursesBeforeCurrentSemester, course, conflicts, completedCourseIds);
                        if (course.course_follow) {
                            if (i === newSchedule.length - 1 && j === 0 || i < newSchedule.length - 1) {
                                //check if the next semester has the course that follows
                                checkFollowerCourse(course, j === 0 ? newSchedule[i][j+1] : newSchedule[i+1][j], conflicts);
                            } else {
                                //the course has a follower course but there is no position for the course to go, add a conflict
                                conflicts.push(["followRequirement", course.course_follow]);
                                course.conflicts.push(["followRequirement", course.course_follow]);
                            }
                        }
                        checkForUOS(course, unitsStudiedBeforeSem, conflicts);
                        checkSemester(course, conflicts, j)
                    }
                }
            })
            coursesBeforeCurrentSemester.push(...coursesInCurrentSemester);
            coursesInCurrentSemester = [];
            unitsStudiedBeforeSem = unitsStudied;
        }
    }
}
