class Space {
  // create a new space and parameters to track whether it was visited, its coordinates,
  // its distance from a starting point, and what valid destinations are possible from it
  constructor(coordinates) {
    this.visited = null;
    this.distance = null;
    this.space = coordinates;
    this.destinations = this.calculateDestinations(coordinates);
    this.calledFrom = null;
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

  knightMoves(start, end) {
    if ((start[0] < 0) || (start[1] < 0) || (end[0] < 0) || (end[1] < 0)
    || (start[0] > 7) || (start[1] > 7) || (end[0] > 7) || (end[1] > 7)) {
      return console.log('Invalid parameters entered!');
    }
    if ((start[0] === end[0]) && (start[1] === end[1])){
      return console.log('Please select different locations for start and end points!');
    }
    // create queue that will check spaces that will be moved to next
    let queue = [];
    queue.push(start);

    // set start position of board to visited so it isn't checked for movement later
    this.board[start[0]][start[1]].visited = true;

    // log start and end position of knight
    this.start = start;
    this.end = end;

    // set initial position of knight to zero distance
    this.board[start[0]][start[1]].distance = 0;

    // run through all possible moves until the end point is found
    do {
      // retrieve values of the item currently queued for checking
      let currentLocation = queue[0];
      let Futuredestinations = this.board[currentLocation[0]][currentLocation[1]].destinations;
      let currentDistance = this.board[currentLocation[0]][currentLocation[1]].distance;
      if ((currentLocation[0] === end[0]) && (currentLocation[1] === end[1])) {
        if (currentDistance === 1) {
          console.log(`Found in ${currentDistance} move!`);
        }
        else {
          console.log(`Found in ${currentDistance} moves!`);
        }
        this.outputResults(end);
        this.clearBoard();
        return 
      }
      for (let i = 0; i < Futuredestinations.length; i++) {
        // if space hasn't been visited yet perform necessary actions
        if (!this.board[Futuredestinations[i][0]][Futuredestinations[i][1]].visited)  {
          // add destinations of current positions to the queue
          queue.push(this.board[Futuredestinations[i][0]][Futuredestinations[i][1]].space);
          // make sure this location will be one greater than current distance
          this.board[Futuredestinations[i][0]][Futuredestinations[i][1]].distance = currentDistance + 1;
          // mark as visited to show it is being queued and won't be queued again
          this.board[Futuredestinations[i][0]][Futuredestinations[i][1]].visited = true;
          // add tracker for which space added this one to the queue
          this.board[Futuredestinations[i][0]][Futuredestinations[i][1]].calledFrom = currentLocation;
        }
      }
      queue.shift();
    } while (queue.length > 0);
  }

  outputResults(end) {
    let moveTracker = [];
    let location = end;
    do {
      moveTracker.push(location);
      location = this.board[location[0]][location[1]].calledFrom;
    } while (location !== null);
    moveTracker.reverse();
    console.log('The following sequence of moves was made:');
    for (let i = 0; i < moveTracker.length; i++) {
      console.log(`${moveTracker[i]}`);
    }
  }

  clearBoard() {
    this.start = null;
    this.end = null;
    this.board = this.generateBoard();
  }
}
  
let board = new ChessBoard();
console.log(board);
console.log(board.board[0]);
console.log(board.board[0][0]);
console.log(board.board[0][5]);
console.log(board.board[0][7]);
console.log(board.board[4][4]);

board.knightMoves([0,0],[1,2]);

board.knightMoves([0,0],[5,2]);

board.knightMoves([0,0],[0,0]);

board.knightMoves([8,0],[5,2]);
