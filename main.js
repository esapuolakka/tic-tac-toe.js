const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function welcome() {
  console.log('\n============================');
  console.log('===== TIC TAC TOE Game =====');
  console.log('============================\n');
}

function showBoard(board) {
  console.log(board[0] + '|' + board[1] + '|' + board[2]);
  console.log(board[3] + '|' + board[4] + '|' + board[5]);
  console.log(board[6] + '|' + board[7] + '|' + board[8]);
}

function checkWin(board, current_player, x_points, o_points) {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (const combo of winningCombos) {
    if (board[combo[0]] === current_player &&
        board[combo[1]] === current_player &&
        board[combo[2]] === current_player) {
      if (current_player === 'X') {
        x_points++;
      } else {
        o_points++;
      }
      return true;
    }
  }
  return false;
}

function playGame() {
  let names = true;
  let game;
  let cell;
  let x_points = 0;
  let o_points = 0;
  let turn;
  let player_x;
  let player_o;

  welcome();

  rl.question('Player X, write your name: ', (xName) => {
    rl.question('Player O, write your name: ', (oName) => {
      player_x = xName;
      player_o = oName;
      mainLoop();
    });
  });

  function mainLoop() {
    turn = 1;
    let current_player = 'X';
    const board = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    rl.question('\nStart the game? (press "y" to play, any else to quit)\n', (play) => {
      play = play.toUpperCase();
      if (play === 'Y') {
        game = true;
        singleGameLoop();
      } else {
        rl.close();
        return;
      }
    });

    function singleGameLoop() {
      showBoard(board);

      rl.question(`\nPlayer ${current_player}. Choose a cell by entering a number (1-9):\n`, (input) => {
        cell = parseInt(input) - 1;

        if (board[cell] === 'X' || board[cell] === 'O') {
          console.log('The cell is already taken. Choose another one!');
          singleGameLoop();
        } else {
          board[cell] = current_player;

          if (checkWin(board, current_player, x_points, o_points)) {
            showBoard(board);
            console.log(`\nPlayer ${current_player} Won!\n`);
          } else if (turn === 9) {
            console.log('\nThe game is a tie!\n');
          } else {
            current_player = current_player === 'X' ? 'O' : 'X';
            turn++;
            singleGameLoop();
          }
        }
      });
    }
  }
}

playGame();
