class KnightTravails {
  knightMoves(start, goal) {
    const rows = 8;
    const cols = 8;
    const visited = new Set(); // to auto remove duplicates
    const queue = [];

    const moves = [
      // legal moves for knight
      [-2, -1],
      [-1, -2],
      [1, -2],
      [2, -1],
      [2, 1],
      [1, 2],
      [-1, 2],
      [-2, 1],
    ];

    queue.push({ pos: start, path: [start] }); // push starting position and path as an object
    visited.add(start.toString()); // stringify visited nodes to simplify addition; add nodes to visited set

    while (queue.length > 0) {
      const { pos, path } = queue.shift(); // dequeue first item on list, use return value for pos and path vars respectively
      const [row, col] = pos; // destructure pos to initialize row and col vars

      if (row === goal[0] && col === goal[1]) {
        return this.printBoard(path);
      }

      for (const [dr, dc] of moves) {
        const r = row + dr; // calculate neighboring cells,
        const c = col + dc; // by adding moves offsets to the current cell
        const next = [r, c];

        if (
          r >= 0 && // check for bounds
          c >= 0 && // check for bounds
          r < rows && // check for bounds
          c < cols && // check for bounds
          !visited.has(next.toString()) // not visited yet
        ) {
          visited.add(next.toString());
          queue.push({ pos: next, path: [...path, next] });
        }
      }
    }
    return null;
  }

  printBoard(path) {
    console.log(`Knight's path:`, path); // print path in array format
    const board = Array.from({ length: 8 }, () => Array(8).fill(0));
    for (let i = 0; i < path.length; i++) {
      const [r, c] = path[i];
      board[r][c] = String(i).padStart(2, "0"); // convert cell value into string, pad the string (with 0) such as it's at least 2 characters long
    }
    console.log("Path visualized:");
    for (let row of board) {
      console.log(row.map((cell) => (cell === 0 ? ".." : cell)).join(" ")); // if cell is zero, convert to double dots to maintain structure
    }
    console.log("End of path");
  }
}

export { KnightTravails };
