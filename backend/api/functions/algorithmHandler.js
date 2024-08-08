//algorithmHandler.js
//this class will handle the preprocessing on the data from the database needed to be able to run the algorithm
//takes as input an (Array of course objects) - during testing I will be hardcoding the JSON info to be able to test the algorithm so will need to figure out a prio queue implementation anyway
    //should make a decision about whether we should force a student to indicate beforehand what directeds/electives they will do or if we should just go with placeholders and plan without them
        //for now, I will assume that directeds are not chosen beforehand - in this case, only 21 courses should be passed for the cyber sec major
    //priority queues do not exist in java - will have to make (copy) one 
//kahn's algorithm functions based on an input queue - this input queue will instead be changed to a priority queue

import PriorityQueue from "./prioQueue.js";

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
    constructor(inputCourses, semesterCount = 6){
        this.courseArray = structuredClone(inputCourses);
        this.semesterCount = semesterCount;
        this.preprocessData();
    }

    preprocessData = () => {
        this.courseCodeList = this.courseArray.map((course) => course._id); //creating a list of all the course codes
        //course list will be passed to the algorithm or will be used to make the prio queue
        //courseCodeList = [courseID1, courseID2, etc]
        
        //once completed courses are introduced, I believe most of the below map function will need to be remade since if a course is already completed it shouldn't have an edge in the graph
        this.graph = this.courseArray.map((course, i, courseList) => {
            let outputArray = []; //output array will be an array of numbers such that if a number is in the array, the course has a connection (assumed or requisite) on it
            course.assumed_knowledge.forEach(assCourse => {
                if (Array.isArray(assCourse)){ 
                    //check which of the options are in the list of courses
                    assCourse.filter(course => this.courseCodeList.includes(course)); //this is a wildly inefficient method of doing this and if the arrays were going to actually be long, I would consider changing it, however, given that the codeList is at most extreme 48 objects long and the requirement intersection at most 4 long, I believe this is suitable
                    outputArray.push(this.courseCodeList.indexOf(assCourse[0])); //need to put [0] since .filter returns an array
                }
                else if (!(assCourse.slice(assCourse.length-2) === "us")) { //checking if the requirement we are adding is not a unit of study requirement
                    outputArray.push(this.courseCodeList.indexOf(assCourse))
                }
            });
            course.requisites.forEach(reqCourse => {
                outputArray.push(this.courseCodeList.indexOf(reqCourse)) 
            });

            return outputArray;
        });

        //graph[course that has required courses][required courses]
            //all course codes can be identified by the fact that the indexes of the course in the input array is how the graph is mapped
            //e.g if the first course in the input array is comp2230, everything in graph[0] is a required course for comp2230
            //further, by checking if a course has an empty array in its given index, in-degree can be quickly determined
            //this, in theory I believe, should remove any needs for searching through arrays for (most of) the algorithm.
        this.prioQueue = new PriorityQueue()
        //now need to find all the courses with 0 indegree, as mentioned above, this can be done by simply checking if any nodes in the graph have an empty array
        this.graph.forEach((required, i) => {
            if (!(required.length)) {
                this.prioQueue.enqueue(this.courseCodeList[i], i); //if we find a course with 0 indegree, lookup the courseCode from the array and queue it up
            }
        })
    }
}

export default AlgorithmHandler;
