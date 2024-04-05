import { forEach } from "lodash";

export class Square {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.visited = false;
    this.spaceOpen = true;
    this.possibleMoves = [];
  }
}

export function Board() {
  return {
    board: generateSquares(),
    moves: [],
    getSquare(xval, yval) {
      const filter = this.board.filter(board => board.x == xval && board.y == yval);
      if(filter.length == 1)
        return filter;
      else
        return console.log('No Squares Found');
    },
    breadthFirstSearch(current, stop) {
      let result = [];
      //0 Moves
      if (current[0].x == stop[0].x && current[0].y == stop[0].y)
        return console.log("Knight Does not need to move");
      result.push(current[0]);
      // Try in 1 move
      function loop (current, stop, result){
        console.log(current);
        for(let i=0; i<current[0].possibleMoves.length; i++){
          if (current[0].possibleMoves[i][0].x == stop[0].x && current[0].possibleMoves[i][0].y == stop[0].y){
            console.log(current[0].possibleMoves[i]);
            result.push(current[0].possibleMoves[i]);
            return result;
            }
          }
        }
        result = loop(current, stop, result);
        console.log(result);
        if (result[0].x != stop[0].x && result[0].y != stop[0].y) {
          // Try in 2 moves
          for (let i=0; i<current[0].possibleMoves[i]; i++){
            for (let j=0; j<current[0].possibleMoves[i].possibleMoves[j]; j++) {
              loop(current[0].possibleMoves[i].possibleMoves[j]);
            }
          }
      }
     
      return result;
    },
    knightMoves(start, stop) {
      let count = -1;
      let startingSquare = this.getSquare(start[0], start[1]);
      let endSquare = this.getSquare(stop[0], stop[1]);
      let result = this.breadthFirstSearch(startingSquare, endSquare);
      console.log(result);
      if (result.length == 1)
        console.log(`Knight Reaches [${result[0].x}, ${result[0].y}] in 1 move.`)
      for (let i=0; i<result.length; i++){
        console.log(result);
        count++;
        if (i == 0)
          console.log(`Knight starts at: (${result[i].x}, ${result[i].y})`);
        else if(i == result.length - 1)
          console.log(`Knight ends at: (${result[i][0].x}, ${result[i][0].y}), in ${count} moves`);
        else{
          console.log(`Knight moves to: (${result[i][0].x}, ${result[i][0].y}})`);
        }
      } 
    }
  }
}


export function generateSquares () {
  let board = [];
  for (let x = 0; x<=7; x++) {
    for (let y = 0; y <= 7; y++) {
      board.push(new Square(x, y));
    } 
  }
  return board;
}

export function possibleMoves(square, app){
  let xval = square.x;
  let yval = square.y;
  let moves = [];
  let move1 = [xval+1, yval+2];
  let move2 = [xval+2, yval+1];
  let move3 = [xval+2, yval-1];
  let move4 = [xval+1, yval-2];
  let move5 = [xval-1, yval-2];
  let move6 = [xval-2, yval-1];
  let move7 = [xval-2, yval+1];
  let move8 = [xval-1, yval+2];
  moves.push(move1), moves.push(move2), moves.push(move3), moves.push(move4), moves.push(move5), moves.push(move6), moves.push(move7), moves.push(move8);
  for (let i=0; i<moves.length; i++) {
    let moveSquare;
    if (moves[i][0] <=7 && moves[i][0] >= 0 && moves[i][1]<=7 && moves[i][1]>=0) {
      moveSquare = app.getSquare(moves[i][0], moves[i][1]);
      square.possibleMoves.push(moveSquare);
    }
  }
  return square;
}

export function addPossibleMovesToEachSquare(app) {
  for (let i = 0; i<app.board.length; i++){
    possibleMoves(app.board[i], app);
  }
}
  


/*const board = [
  {x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y:0}, {x: 6, y: 0}, {x:7, y:0},
  {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}, {x: 4, y: 1}, {x: 5, y:1}, {x: 6, y: 1}, {x:7, y:1},
  {x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}, {x: 4, y: 2}, {x: 5, y:2}, {x: 6, y: 2}, {x:7, y:2},
  {x: 0, y: 3}, {x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3}, {x: 4, y: 3}, {x: 5, y:3}, {x: 6, y: 3}, {x:7, y:3},
  {x: 0, y: 4}, {x: 1, y: 4}, {x: 2, y: 4}, {x: 3, y: 4}, {x: 4, y: 4}, {x: 5, y:4}, {x: 6, y: 4}, {x:7, y:4},
  {x: 0, y: 5}, {x: 1, y: 5}, {x: 2, y: 5}, {x: 3, y: 5}, {x: 4, y: 5}, {x: 5, y:5}, {x: 6, y: 5}, {x:7, y:5},
  {x: 0, y: 6}, {x: 1, y: 6}, {x: 2, y: 6}, {x: 3, y: 6}, {x: 4, y: 6}, {x: 5, y:6}, {x: 6, y: 6}, {x:7, y:6},
  {x: 0, y: 7}, {x: 1, y: 7}, {x: 2, y: 7}, {x: 3, y: 7}, {x: 4, y: 7}, {x: 5, y:7}, {x: 6, y: 7}, {x:7, y:7},
]*/