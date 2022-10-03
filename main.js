/*----- constants -----*/
let COLORS = {
    '0': ['rgb(224, 226, 219)','Alabaster', ''],
    '1': ['RGB(157, 106, 137)', 'Purple', 'X'],
    '-1': ['RGB(25, 133, 161)', 'Blue', 'O'],
    '2': ['rgb(182, 201, 187)', 'Grey Green']
}

/*----- state variables -----*/
let board; //array of 9 cells
let turn; // 1 or -1 depending on the player
let winner; // null if game is in play, 1 or -1 if there is a winner, 'T' if there is a tie
let headerEl; // background color is green and text is black if game is in play, background color is purple or blue and text is white if there is a winner

/*----- cached elements  -----*/
const msgEl = document.querySelector('h1');
const buttonEl = document.querySelector('button');
headerEl = document.querySelector('header');
const cellsEl = [...document.querySelectorAll('#board > div')]

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleDrop);
buttonEl.addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // 9 cells with indexes 0-8
    turn = 1;
    winner = null;
    headerEl.style.backgroundColor = COLORS['2'][0];
    render();
};

// turn node list of cells into array and use the .findIndex method on the array, 
// provide the dom element that was clicked, and it will return the index. 
// In response to use interaction, update all impacted state, then call render()
function handleDrop(evt) {
    const cellIdx = cellsEl.indexOf(evt.target);
    if (board[cellIdx] !== 0 || winner) return;
    //update the board state with the current player value
    board[cellIdx] = turn;
    // switch player turn
    turn *= -1;
    // check for winner
    winner = getWinner(cellIdx);
    render();
}

// check for winner in board state, return null if no winner, 1 or -1 if winner, 'T' if tie
function getWinner(cellIdx) {
    if ((board[0] !== 0) && 
        (((board[0] === board[1]) && (board[1] === board[2])) ||
        ((board[0] === board[3]) && (board[3] === board[6])) || 
        ((board[0] === board[4]) && (board[4] === board[8])))) {
        return winner = board[cellIdx];

    } else if ((board[3] !== 0) &&
        ((board[3] === board[4]) && (board[4] === board[5]))) {
        return winner = board[cellIdx];

    } else if ((board[6] !== 0) &&
       ((board[6] === board[7]) && (board[7] === board[8]))) {
        return winner = board[cellIdx];

    } else if ((board[1] !== 0) &&
        ((board[1] === board[4]) && (board[4] === board[7]))) {
        return winner = board[cellIdx];

    } else if ((board[2] !== 0) &&
        (((board[2] === board[5]) && (board[5] === board[8])) ||
         (board[2] === board[4] && board[4] === board[6]))) {
        return winner = board[cellIdx];
    } else if (
        (board[0] !== 0) && 
        (board[1] !== 0) && 
        (board[2] !== 0) && 
        (board[3] !== 0) && 
        (board[4] !== 0) && 
        (board[5] !== 0) &&
        (board[6] !== 0) &&
        (board[7] !== 0) &&
        (board[8] !== 0)
    ) {
        return winner = 'T';
    }
}

function render() {
    renderBoard();
    renderMessage();
    renderControls();

}

function renderBoard() {
    board.forEach(function(cell, idx) {
        const cellId = `cell${idx}`;
        let cellEl = document.getElementById(cellId);
        cellEl.innerText = COLORS[cell][2];
        cellEl.style.color = COLORS[cell][0];
        cellEl.style.fontSize = '20vh';
    });
}

function renderMessage() {
    if (winner === 'T') {
        msgEl.innerText = 'Tie Game!'
    } else if (winner) {
        msgEl.innerHTML = `<span style="color: ${COLORS[winner][0]}">${COLORS[winner][2].toUpperCase()}</span> WINS!!!!!`
        headerEl.style.backgroundColor = COLORS[winner][0];
        headerEl.style.color = 'white';
    } else {
        msgEl.innerHTML = `<span style="color: ${COLORS[turn][0]}">${COLORS[turn][2].toUpperCase()}</span>'s Turn!`
    }
}

function renderControls() {
    buttonEl.style.visibility = winner ? 'visible' : 'hidden';
}
