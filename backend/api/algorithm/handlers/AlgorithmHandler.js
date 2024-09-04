//algorithmHandler.js
//this class will handle the preprocessing on the data from the database needed to be able to run the algorithm
//takes as input an (Array of course objects) - during testing I will be hardcoding the JSON info to be able to test the algorithm so will need to figure out a prio queue implementation anyway
    //should make a decision about whether we should force a student to indicate beforehand what directeds/electives they will do or if we should just go with placeholders and plan without them
        //for now, I will assume that directeds are not chosen beforehand - in this case, only 21 courses should be passed for the cyber sec major
    //priority queues do not exist in java - will have to make (copy) one 
//kahn's algorithm functions based on an input queue - this input queue will instead be changed to a priority queue

import PriorityQueue from "../functions/PriorityQueue.js";
import Algorithm from "../functions/algorithm.js";

//course example: 

    // "_id": "2230co",
    // "assumed_knowledge": [
    //   "1120se",
    //   "1510ma"
    // ],
    // "assumed_warning": "",
    // "course_name": "Algorithms",
    // "course_replacement": [],
    // "credits": 10,
    // "require_degree": [],
    // "requisites": [],
    // "requisites_warning": "",
    // "semester_offered": 2
    // }

class AlgorithmHandler {
    /**
     * Constructs a new AlgorithmHandler object
     * @constructor
     * @param {Array} inputCourses - Array of any courses to be completed (This should not include any already completed courses)
     * @param {Object} directedPlaceholder - Object of directed course placeholders
     * @param {Array} completedCourses - Array of completed course codes
     * @param {Number} semesterCount - Number of semesters required to complete the degree
     * @param {Number} coursesPerSem - The number of courses the student wishes to complete per semester
     */
    constructor(inputCourses, directedPlaceholder, completedCourses, semesterCount, coursesPerSem){
        this.courseArray = structuredClone(inputCourses);
        this.semesterCount = semesterCount; //semester count could be inferred from the number of courses remaining and the number of courses they wish to complete per semester
        this.coursesPerSem = coursesPerSem;
        this.completedCourses = completedCourses;
        //maybe an argument to be had about whether or not the below should be completed every single time a new handler is created
        this.preprocessData();
        this.runAlgorithm(directedPlaceholder);
    }

    preprocessData = () => {
        this.courseCodeList = this.courseArray.map((course) => course._id); //creating a list of all the course codes
        //course list will be passed to the algorithm or will be used to make the prio queue
        //courseCodeList = [courseID1, courseID2, etc]
        
        
        //graph[course that has required courses][required courses]
            //all course codes can be identified by the fact that the indexes of the course in the input array is how the graph is mapped
            //e.g if the first course in the input array is comp2230, everything in graph[0] is a required course for comp2230
            //further, by checking if a course has an empty array in its given index, in-degree can be quickly determined
        this.reverseGraph = Array(this.courseArray.length).fill(0).map(() => Array());
        //reverseGraph will be the reverse of the normal graph
            //where normal graph has [course][courses that need to be completed to do course], reverseGraph will have [course][courses that can be completed after doing the course]
        //once completed courses are introduced, I believe most of the below map function will need to be remade since if a course is already completed it shouldn't have an edge in the graph
        this.graph = this.courseArray.map((course, i, courseList) => {
            let outputArray = []; //output array will be an array of numbers such that if a number is in the array, the course has a connection (assumed or requisite) on it
            course.assumed_knowledge.forEach(assumedCourse => {
                if (Array.isArray(assumedCourse)){ 
                    //check which of the options are in the list of courses
                    assumedCourse = assumedCourse.filter(course => this.courseCodeList.includes(course) || this.completedCourses.includes(course)); //this is a wildly inefficient method of doing this and if the arrays were going to actually be long, I would consider changing it, however, given that the codeList is at most extreme 48 objects long and the requirement intersection at most 4 long, I believe this is suitable
                    let index = this.courseCodeList.indexOf(assumedCourse[0]); //finding the index of the course in the courseCodeList
                    if (!(index === -1)){ //if the index exists in the courseCodeList then it is not a completed course already, so we can push it to the graph
                        outputArray.push(index);
                        this.reverseGraph[index].push(i);
                    }
                    //Note that this is making an assumption that all courses passed are correct, with no error checking that all requirements exist
                }
                else if (!(assumedCourse.slice(assumedCourse.length-2) === "us")) { //checking if the requirement we are adding is not a unit of study requirement
                    let index = this.courseCodeList.indexOf(assumedCourse);
                    if (!(index === -1)){
                        outputArray.push(index);
                        this.reverseGraph[index].push(i);
                    }
                }
            });
            course.requisites.forEach(reqCourse => {
                index = this.courseCodeList.indexOf(reqCourse);
                if (!(index === -1)){
                    outputArray.push(index);
                    this.reverseGraph[index].push(i);
                }
            });

            return outputArray;
        });

        this.prioQueue = new PriorityQueue()
        //now need to find all the courses with 0 indegree, as mentioned above, this can be done by simply checking if any nodes in the graph have an empty array
            //this can probably be moved into the actual algorithm class, though I think having it here is nice since it removes any need to iterate through the entire array in the alg clas
        this.graph.forEach((required, i) => {
            if (!(required.length)) {
                this.prioQueue.enqueue(this.courseCodeList[i], i); //if we find a course with 0 indegree, lookup the courseCode from the array and queue it up
            }
        })
    }

    //This method will run everything needed for the algorithm:
        //topological sort
        //scheduling
    runAlgorithm = (directedCourses) => {
        let algorithm = new Algorithm(this.prioQueue, this.graph, this.reverseGraph, this.courseCodeList, this.courseArray, this.completedCourses);
        algorithm.topologicalSort();
        this.sortedCourses = structuredClone(algorithm.sortedCourses); //take a deep copy of the sorted courses so we don't have to rerun the topoligcal sort when checking a course list after a user makes their own
        algorithm.createSchedule(this.semesterCount, this.coursesPerSem, directedCourses)
        this.planSchedule = algorithm.getPlanSchedule();
    }
    // add some getters so that milestone 1 can be achieved

    getCourseCodeList = () => {
        return this.courseCodeList;
    }

    getReqGraph = () => {
        return this.graph;
    }

    getCourseList = () => {
        return this.courseArray;
    }

    getSemCount = () => {
        return this.semesterCount;
    }
}

export default AlgorithmHandler;
