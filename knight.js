class Space {
  // create a new space and parameters to track whether it was visited, its coordinates,
  // its distance from a starting point, and what valid destinations are possible from it
  constructor(coordinates) {
    this.visited = null; this.distance = null;
    this.space = coordinates;
    this.destinations = this.calculateDestinations(coordinates);
  }
  calculateDestinations(space) {
    // array that will store valid destinations
    let destinationArray = [];
    // array showing all possible legal moves for the knight
    let movementArray = [[1, 2], [2,1 ], [2, -1], [-1, 2], [-1, -2], [-2, -1], [-2, 1], [1, -2]];
    // loop through each possible movement option and store in array if it's a valid move
    for (let i = 0; i < movementArray.length; i++) {
      let destination = [];
      let destinationRow = space[0]+movementArray[i][0];
      let destinationCol = space[1]+movementArray[i][1];
      if (((destinationRow <= 7) && (destinationRow >= 0)) 
        && ((destinationCol <= 7) && (destinationCol >= 0))){
        destination.push(destinationRow);
        destination.push(destinationCol);
        destinationArray.push(destination);
      }
    }
    return destinationArray;
  }
}

/*let space = new Space([0,0]);
console.log(space);
let space2 = new Space([3,2]);
console.log(space2);*/

class ChessBoard {
  constructor() {
    this.board = this.generateBoard();
    this.start;
    this.end;
  }
  generateBoard() { // 2d array of board spaces
    let board = [[],[],[],[],[],[],[],[]];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        board[i].push(new Space([i, j]));
      }
    }
    return board;
  }
}
  
let board = new ChessBoard();
console.log(board);
console.log(board.board[0]);
console.log(board.board[0][0]);
console.log(board.board[0][5]);
console.log(board.board[0][7]);

console.log(board.board[4][4]);