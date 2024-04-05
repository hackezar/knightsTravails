import _ from "lodash";
import "./style.css";

import { Board, Square } from "./chessboard";
import { generateSquares, getSquare, possibleMoves, addPossibleMovesToEachSquare } from "./chessboard";

let app = Board();
console.log(app);

app.getSquare(0, 4);

addPossibleMovesToEachSquare(app);
console.log(app);

app.knightMoves([3, 3], [5,7]);