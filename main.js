const gameBoard = (function () {
  const _board = ["", "", "",
                  "", "", "",
                  "", "", ""];

  const _cell0 = document.getElementById('cell-0');
  const _cell1 = document.getElementById('cell-1');
  const _cell2 = document.getElementById('cell-2');
  const _cell3 = document.getElementById('cell-3');
  const _cell4 = document.getElementById('cell-4');
  const _cell5 = document.getElementById('cell-5');
  const _cell6 = document.getElementById('cell-6');
  const _cell7 = document.getElementById('cell-7');
  const _cell8 = document.getElementById('cell-8');
  const _cells = Array.from(document.getElementsByClassName('gameboard-cell'));
  
  const render = () => {
    _cell0.textContent = _board[0];
    _cell1.textContent = _board[1];
    _cell2.textContent = _board[2];
    _cell3.textContent = _board[3];
    _cell4.textContent = _board[4];
    _cell5.textContent = _board[5];
    _cell6.textContent = _board[6];
    _cell7.textContent = _board[7];
    _cell8.textContent = _board[8];
  };
  
  _cells.forEach(cell => cell.addEventListener('click', e => {
    const position = Number(e.target.dataset.index);
    const piece = (gameFlow.getCounter() % 2 === 0) ? "O" : "X";
    fillCell(position, piece);
  }));

  const fillCell = (position, piece) => {
    if (!gameFlow.gameIsStarted()) return;
    if (gameFlow.gameIsFinished()) return;
    if (_board[position] !== "") return;

    _board[position] = piece;
    render();
    gameFlow.addToCounter();
    gameFlow.showResult();
  };

  const reset = () => {
    _board[0] = "";
    _board[1] = "";
    _board[2] = "";
    _board[3] = "";
    _board[4] = "";
    _board[5] = "";
    _board[6] = "";
    _board[7] = "";
    _board[8] = "";
    render();
  }

  const checkResult = () => {
    if (_board[0] === 'X' && _board[1] === 'X' && _board[2] === 'X') return `${gameFlow.player1.name} wins the game`;
    else if (_board[0] === 'O' && _board[1] === 'O' && _board[2] === 'O') return `${gameFlow.player2.name} wins the game`;

    else if (_board[3] === 'X' && _board[4] === 'X' && _board[5] === 'X') return `${gameFlow.player1.name} wins the game`;
    else if (_board[3] === 'O' && _board[4] === 'O' && _board[5] === 'O') return `${gameFlow.player2.name} wins the game`;

    else if (_board[6] === 'X' && _board[7] === 'X' && _board[8] === 'X') return `${gameFlow.player1.name} wins the game`;
    else if (_board[6] === 'O' && _board[7] === 'O' && _board[8] === 'O') return `${gameFlow.player2.name} wins the game`;

    else if (_board[0] === 'X' && _board[3] === 'X' && _board[6] === 'X') return `${gameFlow.player1.name} wins the game`;
    else if (_board[0] === 'O' && _board[3] === 'O' && _board[6] === 'O') return `${gameFlow.player2.name} wins the game`;

    else if (_board[1] === 'X' && _board[4] === 'X' && _board[7] === 'X') return `${gameFlow.player1.name} wins the game`;
    else if (_board[1] === 'O' && _board[4] === 'O' && _board[7] === 'O') return `${gameFlow.player2.name} wins the game`;

    else if (_board[2] === 'X' && _board[5] === 'X' && _board[8] === 'X') return `${gameFlow.player1.name} wins the game`;
    else if (_board[2] === 'O' && _board[5] === 'O' && _board[8] === 'O') return `${gameFlow.player2.name} wins the game`;

    else if (_board[0] === 'X' && _board[4] === 'X' && _board[8] === 'X') return `${gameFlow.player1.name} wins the game`;
    else if (_board[0] === 'O' && _board[4] === 'O' && _board[8] === 'O') return `${gameFlow.player2.name} wins the game`;

    else if (_board[2] === 'X' && _board[4] === 'X' && _board[6] === 'X') return `${gameFlow.player1.name} wins the game`;
    else if (_board[2] === 'O' && _board[4] === 'O' && _board[6] === 'O') return `${gameFlow.player2.name} wins the game`;

    else if (gameFlow.getCounter() > 9) return "It's a tie";

    else return "";
  };

  return {
    render,
    fillCell,
    reset,
    checkResult
  };
})();

const gameFlow = (function () {
  let _gameIsStarted = false;
  let _gameIsFinished = false;
  let _roundCounter = 0;
  
  const _playerTurnDisplay = document.getElementById('player-turn');
  const _winnerDisplay = document.getElementById('game-result');

  const _player1Input = document.getElementById('player1');
  const _player2Input = document.getElementById('player2');
  const player1 = Player('Player 1', 'X');
  const player2 = Player('Player 2', 'O');
  
  const _showTurn = () => {
    if (_roundCounter % 2 === 0) {
      _playerTurnDisplay.textContent = `${player2.name}'s turn`;
    } else {
      _playerTurnDisplay.textContent = `${player1.name}'s turn`;
    }
  };
  
  const showResult = () => {
    const result = gameBoard.checkResult();
    _winnerDisplay.textContent = result;
    if (result === "") {
      _showTurn();
    }
    else {
      _gameIsFinished = true;
      _playerTurnDisplay.textContent = "";
    }
  };
  
  const newGame = (event) => {
    event.preventDefault();
    const formContainer = document.getElementById('form-container');
    const gameboardContainer = document.getElementById('gameboard-container');

    if (_gameIsStarted) {
      gameBoard.reset();
    }

    _gameIsStarted = true;
    _gameIsFinished = false;
    _roundCounter = 0;
    addToCounter();

    if (_player1Input.value) player1.name = _player1Input.value;
    if (_player2Input.value) player2.name = _player2Input.value;

    gameboardContainer.classList.remove('hidden');
    formContainer.classList.add('hidden');
    _winnerDisplay.textContent = "";
    _playerTurnDisplay.textContent = `${player1.name}'s turn`;
  };
  
  const _startGameButton = document.getElementById('start-game-btn');
  _startGameButton.addEventListener('click', newGame, false);

  const addToCounter = () => ++_roundCounter;
  const getCounter = () => _roundCounter;

  const gameIsStarted = () => _gameIsStarted;
  const gameIsFinished = () => _gameIsFinished;

  return {
    newGame,
    addToCounter,
    getCounter,
    gameIsStarted,
    gameIsFinished,
    showResult,
    player1,
    player2
  };
})();

function Player(name, piece) {
  return {
    name,
    piece
  };
};
