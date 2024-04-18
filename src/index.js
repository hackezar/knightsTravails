import _ from "lodash";
import "./style.css";

import Board from "./board";

// Set board size (Standard is 8)
const boardSize = 8;

// Where the knight will start, and where he will end
let start = [0,0];
let stop = [6, 7];

// Make sure the start and stop squares are on the board
if (start[0] >= boardSize || start[1] >= boardSize || stop[0] >= boardSize || stop[1] >= boardSize || start[0] < 0 || start[1] < 0 || stop[0] < 0 || stop[1] < 0) {
  throw new Error('Start or stop square is not on the board!');
}

const board = new Board();
board.makeStandardBoard(boardSize, start);
console.log(board);


/*Initialization: Begin by setting the initial node’s shortest distance to 0
and every other node’s to infinity. This is because, at the start,
we’re certain about the distance of the starting node (it’s zero),
but uncertain about the rest.*/
board.initialize(start);

// Add edges to squares
board.addEdges(boardSize);
console.log(board);

let route = board.findDistance(start, stop);

// Output
console.log(`Knight starts at: [${start[0]},${start[1]}]`);
for (let i=0; i<route.length; i++) {
  if (i == route.length - 1) {
    console.log(`Knight reaches: [${route[i].square[0]},${route[i].square[1]}]`);
    console.log(`Total moves: ${route.length}`);
  }
  else
    console.log(`Knight moves to: [${route[i].square[0]},${route[i].square[1]}]`);
}
