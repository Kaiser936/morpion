const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('gameStatus');
const endGameStatus = document.getElementById('endGameStatus');
const playerOne = 'X'; 
const playerTwo = 'O';
let playerTurn = playerOne;
const isHardMode = document.querySelector('#hard');

cells.forEach(cell => {
    cell.addEventListener('click', playGame, { once: true });
});

function playGame(e) {
    e.target.innerHTML = playerTurn;

    if (checkWin(playerTurn)) {
        updateGameStatus(`wins${playerTurn}`);
        endGame();
    } else if (checkDraw()) {
        updateGameStatus('draw');
        endGame();
    } else {
        playerTurn = playerTurn === playerOne ? playerTwo : playerOne;

        // Appel de makeComputerMove() à chaque fois que c'est le tour de l'ordinateur (playerTwo)
        if (playerTurn === playerTwo) {
            setTimeout(makeComputerMove, 500);
        }
    }
}

function makeComputerMove() {
    const emptyCells = Array.from(cells).filter(cell => cell.innerHTML === '');
    if (emptyCells.length === 0) return;

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    emptyCells[randomIndex].click();
}

function checkWin(player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // lignes
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // colonnes
        [0, 4, 8], [2, 4, 6]             // diagonales
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => cells[index].innerHTML === player);
    });
}

function checkDraw() {
    const allCellsFilled = Array.from(cells).every(cell => cell.innerHTML !== '');
    return allCellsFilled;
}

function updateGameStatus(status) {
    switch (status) {
        case 'X': // Lorsque c'est le tour du joueur 1 (X)
            gameStatus.textContent = 'A vous de jouer';
            break;
        case 'winsX':
            gameStatus.textContent = 'Vous avez gagné !';
            break;
        case 'winsO':
            gameStatus.textContent = 'Vous avez perdu !';
            break;
        case 'draw':
            gameStatus.textContent = 'Egalité !';
            break;
        default:
            gameStatus.textContent = 'Au tour de l\'ordinateur'; // Par défaut, au tour de l'ordinateur (O)
            break;
    }
}


function endGame() {
    const gameEnd = document.getElementById('gameEnd');
    gameEnd.style.display = 'block';

    if (checkWin(playerOne)) {
        endGameStatus.textContent = 'Le joueur 1 (X) a gagné !';
    } else if (checkWin(playerTwo)) {
        endGameStatus.textContent = 'Le joueur 2 (O) a gagné !';
    } else if (checkDraw()) {
        endGameStatus.textContent = 'Egalité !';
    }

    document.getElementById('reloadGame').addEventListener('click', reloadGame);
}

function reloadGame() {
    window.location.reload();
}