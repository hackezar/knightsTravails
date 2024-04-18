export default class Board {
    constructor() {
        this.squares = []
    }
    makeStandardBoard = (boardSize,) => {
        // Set how big the board will be (Standard is 8)
        for (let x = 0; x<boardSize; x++) {
            for (let y=0; y<boardSize; y++) {
                let square = {
                    square: [x,y],
                    distance: 99
                }
                this.squares.push(square);
            }
        }
        return this;
    }
    initialize = (start) => {
        let foundIndex = this.squares.findIndex( x => x.square[0] == start[0] && x.square[1] == start[1]);
        this.squares[foundIndex].distance = 0;
        return this;
    }

    addEdges = (boardSize) => {
        for (let i=0; i<this.squares.length; i++) {
            this.squares[i].neighbors = [];
            if (this.squares[i].square[0] + 1 < boardSize && this.squares[i].square[1] + 2 < boardSize)
                this.squares[i].neighbors.push([(this.squares[i].square[0] + 1), (this.squares[i].square[1] + 2)]);
            if (this.squares[i].square[0] + 2 < boardSize && this.squares[i].square[1] + 1 < boardSize)
                this.squares[i].neighbors.push([(this.squares[i].square[0] + 2), (this.squares[i].square[1] + 1)]);
            if (this.squares[i].square[0] - 1 >= 0 && this.squares[i].square[1] + 2 < boardSize)
                this.squares[i].neighbors.push([(this.squares[i].square[0] - 1), (this.squares[i].square[1] + 2)]);
            if (this.squares[i].square[0] - 1 >=0  && this.squares[i].square[1] - 2 >= 0)
                this.squares[i].neighbors.push([(this.squares[i].square[0] - 1), (this.squares[i].square[1] - 2)]);
            if (this.squares[i].square[0] + 2 < boardSize && this.squares[i].square[1] - 1 >= 0)
                this.squares[i].neighbors.push([(this.squares[i].square[0] + 2), (this.squares[i].square[1] - 1)]);
            if (this.squares[i].square[0] - 2 >= 0 && this.squares[i].square[1] + 1 < boardSize)
                this.squares[i].neighbors.push([(this.squares[i].square[0] - 2), (this.squares[i].square[1] + 1)]);
            if (this.squares[i].square[0] - 2 >= 0 && this.squares[i].square[1] - 1 >= 0)
                this.squares[i].neighbors.push([(this.squares[i].square[0] - 2), (this.squares[i].square[1] - 1)]);
        }
    }
    getSquare = (square) => {
        for (let i=0; i<this.squares.length; i++) {
            if (this.squares[i].square[0] == square[0] && this.squares[i].square[1] == square[1])
                return this.squares[i];
        }
    }

    markVisited = (start) => {
        for (let i=0; i<this.squares.length; i++) {
            if (this.squares[i].square[0] == start.square[0] && this.squares[i].square[1] == start.square[1])
                return this.squares[i].visited = true;
        }
    }

    findDistance = (start, stop) => {
        const startNode = this.getSquare(start);
        const endNode = this.getSquare(stop);

        // Create a queue
        let queue = [];

        // Visit and addthe start node to the queue
        startNode.visited = true;
        queue.push(startNode);
        console.log(endNode);
        // BFS until queue is empty
        while (queue.length > 0) {
            // Pop a node from queue for search operation
            let currentNode = queue.shift();

            // Loop through neighbors nodes to find the end node
            for (let i=0; i<currentNode.neighbors.length; i++) {
                let neighbourNode = this.getSquare(currentNode.neighbors[i]);
                if (!neighbourNode.visited) {
                    // Visit and add neighbors nodes to the queue
                    neighbourNode.visited = true;
                    queue.push(neighbourNode);
                    // Update its preceding node
                    neighbourNode.previous = currentNode;
                    // Stop BFS if the visited node is the end node
                    if (neighbourNode === endNode) {
                        // queue = [];
                        break;
                    }
                }
            }
        }
        // Function to trace the route using previous nodes
        let currentNode = endNode;
        const route = [];
        // Start node has no preceding node
        // So loop until node -> previous is null
        while (currentNode.previous) {
            route.push(currentNode);
            currentNode = currentNode.previous;
        }
        // Reverse the route bring start to front
        route.reverse();
        //Output route
        return route;
    }
}