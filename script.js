const statusDisplay = document.querySelector('.game--status');
const columns = 3; 
const rows = 6;

let currentPlayer = 'O'; 
let gameState = Array(columns * rows).fill('');

const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const cells = document.querySelectorAll('.cell');

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  handleCellPlayed(clickedCellIndex);
}

function handleCellPlayed(cellIndex) {
  for (let row = rows - 1; row >= 0; row--) {
    const index = cellIndex + row * columns;

    if (gameState[index] === '') {
      gameState[index] = currentPlayer;
      const cell = cells[index];
      cell.textContent = currentPlayer;
      if (handleResultValidation()) {
        statusDisplay.innerHTML = `Player ${currentPlayer} wins!`;
        cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
        return;
      }
    
      handlePlayerChange();
      return;
    }
  }
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleRestartGame() {
  currentPlayer = 'O';
  gameState = Array(columns * rows).fill('');
  statusDisplay.innerHTML = currentPlayerTurn();
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleCellClick);
  });
}

function handleResultValidation() {

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col <= columns - 3; col++) {
      const idx = row * columns + col;
      const line = gameState.slice(idx, idx + 3);
      if (line.every(val => val === currentPlayer && val !== '')) {
        return true;
      }
    }
  }

  
  for (let col = 0; col < columns; col++) {
    for (let row = 0; row <= rows - 3; row++) {
      const idx = row * columns + col;
      const line = [gameState[idx], gameState[idx + columns], gameState[idx + columns * 2]];
      if (line.every(val => val === currentPlayer && val !== '')) {
        return true;
      }
    }
  }

  
  for (let row = 0; row <= rows - 3; row++) {
    for (let col = 0; col <= columns - 3; col++) {
      const idx = row * columns + col;
      const line = [gameState[idx], gameState[idx + columns + 1], gameState[idx + columns * 2 + 2]];
      if (line.every(val => val === currentPlayer && val !== '')) {
        return true;
      }
    }
  }

  
  for (let row = 2; row < rows; row++) {
    for (let col = 0; col <= columns - 3; col++) {
      const idx = row * columns + col;
      const line = [gameState[idx], gameState[idx - columns + 1], gameState[idx - columns * 2 + 2]];
      if (line.every(val => val === currentPlayer && val !== '')) {
        return true;
      }
    }
  }

  return false;
}
