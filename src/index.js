import _ from "lodash";
import "./style.css";

class Board {
  constructor() {
    this.adjacentList = {};
  }
  // helper to add a square as a key to the adjacency hash table 
  // and that squares adjacency list as thekeys value. It returns the square
  addSquare = (x, y) => {
    this.adjacentList[[x,y]] = [];
    return [x,y];
  }
  // helper to add an edge between two squares that share a knight move.
  // This creates a graph that stores connections between squares.
  addEdge = (square1, square2) => {
    this.adjacentList[square1].push(square2);
  }
  /*The next major helper function considers all possible combinations
    of the Knight move metric of two squares along an axis and one square 
    on the perpendicular axis. It takes the coordinates of a square and
  the size of the board, and if the moves are legal, creates the square
  and adds the appropriate coordinates to the square’s adjacency list. */
  knightPositions = (x, y, n) => {
    let square = this.addSquare(x, y);

    if ((x+2 < n) && (y+1 < n)) {
      this.addEdge(square, [x+2, y+1]);
    }
    if ((x-2 >= 0) && (y+1 < n)) {
      this.addEdge(square, [x-2, y+1]);
    }
    if((x+2 < n) && (y-1 >= 0)) {
      this.addEdge(square, [x+2, y-1]);
    }
    if((x-2 >= 0) && (y-1 >= 0)) {
      this.addEdge(square, [x-2, y-1]);
    }
    if ((x+1 < n) && (y+2 < n)) {
      this.addEdge(square, [x+1, y+2]);
    }
    if ((x+1 < n) && (y-2 >= 0)) {
      this.addEdge(square, [x+1,y-2]);
    }
    if ((x-1 >= 0) && (y+2 < n)) {
      this.addEdge(square, [x-1, y+2]);
    }
    if ((x-1 >= 0) && (y-2 >=0)) {
      this.addEdge(square, [x-1, y-2]);
    }
  }
  // Next we create a helper that uses knighPositions() above and 
  // Recursively fills the hash table with all possible knight move
  // Combinations. This is the method that creates the board
  allKnightPositions = (x, y, n) => {
    if (!this.adjacentList[`${x},${y}`]) {
      this.knightPositions(x, y, n);
      this.adjacentList[`${x},${y}`].map(child => {
        {
          this.allKnightPositions(child[0], child[1], n);
        }
      });
    }
  }
  /*The master function numberOfKnightMoves() combines the functionality
  of all of the methods above to perform the goal computation. It takes 
  the starting and the ending coordinates, and the size of the board, and
  returns the number of possible Knight moves between the two squares. Here,
  n is an integer indicating the size of a side of the board. So, for example,
  if n = 3, then the board would have 9 squares, arranged in 3 rows and 3 columns.
  The coordinates are built as a 0-indexed n-1 x n-1 matrix. The general algorithm
  is Breadth-first search, used on a graph. It traverses each square’s adjacency
  list and looks for the ending coordinates.

  Now, the allKnightPositions() helper function is used to populate the 
  adjacency matrix with all possible edges. The number of Knight moves
  to be calculated is initialized to 0.*/
  numberOfKnightMoves = (xStart, yStart, xEnd, yEnd, n) => {
    console.log(`Knight starts at square (${xStart}, ${yStart})`);
    this.allKnightPositions(xStart, yStart, n);
    let numberOfKnights = 0;

    // A pointer to the first square in the graph is initialized,
    // along with the helper structures used to traverse through the graph
    let currentSquareList = this.adjacentList[`${xStart},${yStart}`];
    let finalList = [];
    let searchQueue = [];
    currentSquareList.forEach(square => {
      searchQueue.push(square);
    });

    // Cache for already checked squares
    let checked = {};
    checked[[xStart, yStart]] = 'checked';
    // As the loop traverses throught the squares, the number of Knight moves is incremented.
    // This variable is placed at the start of the loop to catch the very first square that
    // was pushed into the search queue above.
    while(searchQueue.length > 0) {
      // Then each square is checked to see if it matches the end coordinates. If the coordinates match,
      // the number of moves is returned. It has to be divided by 2, because Breadth-first search doubles
      // the number of graph edges.
      let currentSquare = searchQueue.shift();

      if((currentSquare[0] == xEnd) && (currentSquare[1] == yEnd)) {
        console.log(`Knight reaches square (${xEnd}, ${yEnd})`);
        return Math.round(numberOfKnights/2);
      }
      // If this is not the ending square, it’s placed into the checked hash table, if not in there already,
      // and the search for the Holy Grail continues until the queue of squares is emptied.
      finalList.push(currentSquare);
      console.log("Knight moves to " + currentSquare);
      if (this.adjacentList[`${currentSquare[0]},${currentSquare[1]}`] && !checked[`${currentSquare[0]},${currentSquare[1]}`]) {
        this.adjacentList[`${currentSquare[0]},${currentSquare[1]}`].forEach(square => {
          if(!checked[`${square[0]},${square[1]}`]) {
            searchQueue.push(square);
            checked[[currentSquare[0],currentSquare[1]]] = 'checked';
          }
        });
      }
    }
  }
}


// Actual running
const board = new Board();
const numberOfKnightMoves = board.numberOfKnightMoves(1, 1, 3, 5, 8);
console.log("Number of knight moves: ", numberOfKnightMoves);




