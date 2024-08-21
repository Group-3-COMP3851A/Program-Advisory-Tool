//this will take the data from the algorithmHandler and it will run the topological sort and scheduling 
class Algorithm {
    constructor(queue, graph, reverseGraph, courseCodeList, courseArray, completedCourseCount = 0) {
        this.queue = queue;
        this.normalGraph = graph;
        this.reverseGraph = reverseGraph;
        this.courseCodeList = courseCodeList;
        this.courseArray = courseArray;
        this.completedCourseCount = completedCourseCount;
    }

    topologicalSort = () => {
        this.sortedCourses = []; //sorted array to be returned
        let uosQueue = [];
        let graph = structuredClone(this.normalGraph); //create a copy of the normal graph

        while (!this.queue.isEmpty()) {
            // Check if there are courses in the uosQueue that have met their units of study requirement
            // If so, remove them from the queue and add them to the sortedCourses array
            if (uosQueue.length > 0) {
                // Iterate over each course in the uosQueue
                uosQueue.forEach((course, i) => {
                    // Check if the course has met its units of study requirement
                    if (course.us <= (this.sortedCourses.length)*10) {
                        // Remove the course from the uosQueue
                        uosQueue.splice(i, 1);
                        // Add the course to the sortedCourses array
                        this.sortedCourses.push(course);
                    }
                })
            }
            let course = this.queue.dequeue(); //this dequeues a course object: course = {courseCode, priority, index}
            //we don't want to change the normalGraph since we do still need it for determining where exactly where should place courses in a given semester to make sure a course is no scheduled with it's dependency
            if (this.reverseGraph[course.index]) { //check if there are any courses reliant on this course - if there are no reliant courses, this value will be undefined and, thus, falsey
                this.reverseGraph[course.index].forEach((reliantCourse) => {
                    //for each course with a reliance on the current course object, remove the current course (course.index) from its list of dependencies
                    graph[reliantCourse].splice(graph[reliantCourse].indexOf(course.index), 1); 
                    //check if removing the dependency caused the course to have no more dependencies
                    if (graph[reliantCourse].length === 0) {
                        //if there are no more dependencies, we can add it to the queue. 
                        this.queue.enqueue(this.courseCodeList[reliantCourse], reliantCourse);
                    }
                });
            }

            // Check if the course has a units of study requirement
            // If so, add the course to the uosQueue
            const assumedKnowledge = this.courseArray[course.index].assumed_knowledge;
            const lastElement = assumedKnowledge[assumedKnowledge.length - 1];
            // Check if the last element is a string and ends with 'us'
            if (typeof lastElement === 'string' && lastElement.endsWith('us')) {
                // Parse the units of study requirement from the last element
                course.us = parseInt(lastElement.slice(0, -2));
                if (course.us <= (this.sortedCourses.length)*10) {
                    // Add the course to the uosQueue
                    uosQueue.push(course);
                } else this.sortedCourses.push(course);
                
            } else {
                this.sortedCourses.push(course);
            }
        }
    }

    createSchedule = (semesterCount = 6, coursesPerSem = 4, directedCourses) => {
        let schedule = Array(semesterCount).fill(0).map(() => Array(coursesPerSem).fill(null)); //creating array: [semesterCount][coursesPerSem]
        //the way to handle a schedule that has already begun would be to subtract the number of courses completed divided by the coursesPerSem from the semester count OR handle it beforehand somehow
        //this would also have to be passed through to the placeDirecteds somehow
        this.coursesPerSem = coursesPerSem;
        if (semesterCount < 4) {
            //if the student is doing a less than full time plan, need to find where the directeds would fit given the reqs
            this.sortDirected(directedCourses);
        } else this.placeDirecteds(directedCourses, schedule) //if we're doing a full time plan, can just place the directeds where they belong normally
        this.findEarliestSemester(schedule);
        this.planSchedule = schedule;
    }

    //finds the earliest semester that a course can be taken given reqs and other info
    findEarliestSemester = (schedule) => {
        let placed;
        let semester_offered, placement = [0, 0];
        while(!(this.sortedCourses.length === 0)){
            let course = this.sortedCourses.shift(); //take the first course
            semester_offered = this.courseArray[course.index].semester_offered; //get the semester offering/s for the course
            if (this.normalGraph[course.index].length === 0) { //the course has no dependencies so we can just place it as soon as possible
                //looping through the schedule and finding the earliest placement that has no course scheduled
                let startingSemester = 0;
                if ((course.us)) {
                    //remaining units is the number of units that need to be completed before a course can be taken - i.e the earliest possible semester placement
                    let remainingUnits = course.us/10 - this.completedCourseCount;
                    if (remainingUnits >= 0){
                        startingSemester = Math.ceil(remainingUnits/this.coursesPerSem);
                    }
                }
                placed = false;
                for (let i = startingSemester; i < schedule.length && !placed; i++) {
                    //if the course is not offered in the current semester, skip the semester
                    //below condition checks if the semestered offered is NOT 0 AND is the semester offered is the same parity
                        //note on the parity: it checks if it is the SAME parity because arrays start at 0 so semester 1 is even parity and semester 2 is odd parity
                        //e.g semester_offered = 1 and i = 0 (sem 1), 1+0%2 = 1, hence on odd parity, we should check if the course can fit
                    if ((!(semester_offered === 0))&&((semester_offered+ i) % 2 === 0)) {
                        continue;
                    }
                    for (let j = 0; j < schedule[i].length; j++) {
                        if (schedule[i][j] === null) {
                            placement = [i, j];
                            placed = true;
                            break;
                        }
                    }
                }
                //TODO: After adding any course, need to check if there is a following course
                    //need to also check that it actually found a place.
            }
            else {
                let dependencies = structuredClone(this.normalGraph[course.index]); //take a clone of the dependencies
                let dependencyInSemester = false;
                placed = false;
                for (let i = 0; i < schedule.length && !placed; i++) {
                    //if the course is not offered in the current semester, skip the semester
                    //below condition checks if the semestered offered is NOT 0 AND is the semester offered is the same parity
                        //note on the parity: it checks if it is the SAME parity because arrays start at 0 so semester 1 is even parity and semester 2 is odd parity
                        //e.g semester_offered = 1 and i = 0 (sem 1), 1+0%2 = 1, hence on odd parity, we should check if the course can fit
                    for (let j = 0; j < schedule[i].length; j++) {
                        if ((schedule[i][j] === null)&&(dependencies.length === 0)) {
                            placement = [i, j];
                            placed = true;
                            break;
                        } else if ((schedule[i][j] !== null)&&(dependencies.includes(schedule[i][j].index))) {
                            dependencies.splice(dependencies.indexOf(schedule[i][j].index), 1);
                            dependencyInSemester = true;
                        }
                    }
                    if ((course.us) && (i<=(course.us/10 - this.completedCourseCount)/this.coursesPerSem)) { //uos checking
                        placed = false;
                    }
                    if ((!(semester_offered === 0))&&((semester_offered + i) % 2 === 0)) {
                        placed = false;
                    }
                    if (dependencyInSemester) {
                        placed = false;
                        dependencyInSemester = false;
                    }
                }

                //TODO: handle courses with dependencies
                //if a course does have dependencies, what do we need to check before we place it?
                    //check if the earliest possible place has courses that are dependencies
                    //check that all dependencies have been placed - unfortunately this is required
                        //ex: comp3260 has dependencies on seng1120 and math1510, if a student is doing 2 courses per sem, sem 2 year 1 may not have seng1120 or math1510 (note: both sem 2 courses and comp3260 is sem 1)
                        //if we don't check that dependencies are placed before and assume they are, comp3260 may be placed before seng1120 or math1510, violating assumed knowledge
                        //because of this reason we also can't just remove the dependency when it gets placed like we did for sorting the courses
            }
            if (placed) schedule[placement[0]][placement[1]] = course;
        }
    }

    //takes directed course array as input, will read from the directed courses whereabouts they should go in the schedule and will add them to the schedule
    placeDirecteds = (directedCourses, schedule) => {
        directedCourses.forEach((directed) => {
            let placements = directed.semester_placements;
            placements.forEach((placement) => {
                //since directeds store the year and semester of the directed, year-1 * 2 + semester will find the correct semester (e.g year 3 sem 1 = 3-1 * 2 + 1 = 5th semester which is correct)
                //note the -1 on the end because arrays start at 0 not 1
                schedule[(placement.year-1)*2 + placement.semester - 1][0] = {code: "placeholder"};
            })
        })
    }

    //since every directed course for a given major will always have the same requirements, we only need to find at which point it is able to be sorted once and then we can just as many placeholders as necessary there
    sortDirected = (directedCourses) => {
        //doesn't matter which directed course we get the assumed knowledge of, they're all the same
        let assumedKnowledge = structuredClone(directedCourses[0].assumed_knowledge); //directedCourses[0].assumed_knowledge;
        //go through each assumed knowledge and "cross them off" as they go past in the sortedCourses array, once all assumed knowledge is accounted for, add the course to the sortedCourses array
        let index;
        for (index = 0; assumedKnowledge.length > 0 && index < this.sortedCourses.length; index++) {
            let course = this.sortedCourses[index];
            //check if the course currently indexed is in the assumed knowledge
            assumedKnowledge.forEach((assumedCourse, i) => { //forEach replacing an indexOf call
                if (Array.isArray(assumedCourse) && assumedCourse.includes(course.code)) { //if the assumed knowledge is an array and it contains the courseCode, remove it from the assumed knowledge
                    assumedKnowledge.splice(i, 1);
                }
                else if (assumedCourse === course.code) { //if the assumed knowledge is just the courseCode, remove it from the assumed knowledge
                    assumedKnowledge.splice(i, 1);
                }
            })
        }
        if (assumedKnowledge.length === 0)
            for (let i = 0; i < directedCourses.length; i++) 
                this.sortedCourses = this.sortedCourses.splice(index, 0, {code: "placeholder"}); //place as many placeholders as there are directeds in the course
        else console.log("assumed knowledge not accounted for");
    }

    //returns the sorted courses
    getSortedCourses = () => {
        return this.sortedCourses;
    }

    getPlanSchedule = () => {
        return this.planSchedule;
    }
}

export default Algorithm;