//priority queue to handle the algorithm
//elements should only be added to this queue if they have an in-degree of 0

class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    // method to add an element to the queue
    //by also passing the index, it should save us having to search through the string to find the index of the course for our graph
    enqueue(courseCode, index) {
        // extract the priority from the string - regex matches the first digit in the string
        let priority = parseInt(courseCode.match(/^(\d)/));

        let isAdded = false;
        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].prio > priority) {
                this.queue.splice(i, 0, {code: courseCode, prio: priority, index: index});
                isAdded = true;
                break;
            }
        }

        if (!isAdded) {
            this.queue.push({code: courseCode, prio: priority, index: index});
        }
    }

    // method to remove an element from the queue
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.queue.shift();
    }

    // method to check if the queue is empty
    isEmpty() {
        return this.queue.length === 0;
    }

    // method to get the element at the front of the queue
    front() {
        if (this.isEmpty()) {
            return null;
        }
        return this.queue[0];
    }
}

export default PriorityQueue;