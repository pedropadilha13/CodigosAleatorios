const readline = require("readline");

const HEIGHT = 30;
const WIDTH = 30;

const alive = String.fromCharCode(0x25a0);
const dead = String.fromCharCode(0x25a1);

const clearScreen = () => {
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
};

const showBoard = (board, cycle) => {
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      process.stdout.write(`${board[i][j] ? alive : dead} `);
    }
    process.stdout.write("\n");
  }
  process.stdout.write(`\nCycle: ${cycle}\n`);
};

const compareBoards = (board, newBoard) => {
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      if (board[i][j] !== newBoard[i][j]) {
        return true;
      }
    }
  }
  return false;
};

const copy = board => {
  const newBoard = new Array(HEIGHT);
  for (let i = 0; i < HEIGHT; i++) {
    newBoard[i] = [...board[i]];
  }
  return newBoard;
};

const doGameTick = board => {
  const nextBoard = copy(board);

  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      let neighbors = 0;

      for (let ni = -1; ni <= 1; ni++) {
        for (let nj = -1; nj <= 1; nj++) {
          if (i + ni >= 0 && i + ni < HEIGHT && j + nj >= 0 && j + nj < WIDTH) {
            if (board[i + ni][j + nj]) {
              neighbors++;
            }
          }
        }
      }

      if (board[i][j]) {
        neighbors--;
      }

      if (board[i][j] && neighbors < 2) {
        nextBoard[i][j] = false;
      } else if (board[i][j] && neighbors > 3) {
        nextBoard[i][j] = false;
      } else if (!board[i][j] && neighbors === 3) {
        nextBoard[i][j] = true;
      } else {
        nextBoard[i][j] = board[i][j];
      }
    }
  }

  return compareBoards(board, nextBoard) ? nextBoard : false;
};

const sleep = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};

const game = async () => {
  let board = new Array(HEIGHT);
  for (let i = 0; i < HEIGHT; i++) {
    board[i] = new Array(WIDTH);
  }

  // Glider example
  board[0][1] = true;
  board[1][2] = true;
  board[2][0] = true;
  board[2][1] = true;
  board[2][2] = true;

  let cycle = 0;

  do {
    clearScreen();
    showBoard(board, cycle++);
    board = doGameTick(board);
    await sleep(300);
  } while (!!board);
};

game();
