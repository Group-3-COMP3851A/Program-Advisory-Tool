//this will take the data from the algorithmHandler and it will run the topological sort and scheduling 
class Algorithm {
    constructor(queue, graph, reverseGraph, courseCodeList, courseArray) {
        this.queue = queue;
        this.normalGraph = graph;
        this.reverseGraph = reverseGraph;
        this.courseCodeList = courseCodeList;
        this.courseArray = courseArray;
    }

    topologicalSort = () => {
        this.sortedCourses = []; //sorted array to be returned
        let uosQueue = [];

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
            if (this.reverseGraph[course.index]) { //check if there are any courses reliant on this course - if there are no reliant courses, this value will be undefined and, thus, falsey
                this.reverseGraph[course.index].forEach((reliantCourse) => {
                    //for each course with a reliance on the current course object, remove the current course (course.index) from its list of dependencies
                    this.normalGraph[reliantCourse].splice(this.normalGraph[reliantCourse].indexOf(course.index), 1); 
                    //check if removing the dependency caused the course to have no more dependencies
                    if (this.normalGraph[reliantCourse].length === 0) {
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
}

export default Algorithm;