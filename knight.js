class Space {
  // create a new space and parameters to track whether it was visited, its coordinates,
  // its distance from a starting point, and what valid destinations are possible from it
  constructor(coordinates) {
    this.visited = null;
    this.distance = null;
    this.space = coordinates;
    this.destinations = this.calculateDestinations(coordinates);
  }

  calculateDestinations(space) {
    // array that will store valid destinations
    let destinationArray = [];
    // array showing all possible legal moves for the knight
    let movementArray = [[1,2], [2,1], [2, -1], [-1, 2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];
    
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

let space = new Space([0,0]);

console.log(space);

let space2 = new Space([3,2]);

console.log(space2);