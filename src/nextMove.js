export function nextMove(current, stop){
    let xstart = current[0].x;
    let ystart = current[0].y;
    let xstop = stop[0].x;
    let ystop = stop[0].y;
    console.log(stop);
    console.log(current);

    for (let i=0; i<current[0].possibleMoves.length; i++){
        if (xstop == current[0].possibleMoves[i][0] && ystop == current[0].possibleMoves[i][1]) {
            return current[0].possibleMoves[i];
        }
    }
}