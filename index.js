'use strict'

let wordList = [
    'patio',
    'darts',
    'amend',
    'solar',
    'sonar',
    'piano',
    'horse',
    'tough'
];

let randomIndex = Math.floor(Math.random() * wordList.length);
let secret = wordList[randomIndex];

let currentAttempt = 'spark';
let history = [
    'farts',
    'rohan',
    'moldy',
    'after'
];


console.log(`secret is '${secret}'`);
console.log(`history is '${history}'`);
console.log(`currentAttempt is '${currentAttempt}'`);

let grid = document.getElementById('grid');

buildGrid();
updateGrid();

function buildGrid() {
    for (let i=0; i<6; i++) {
        let row = document.createElement('div');
        for (let j=0; j<5; j++) {
            let cell = document.createElement('div');
            cell.className = 'cell';
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

function updateGrid() {
    let row = grid.firstChild;
    for (let attempt of history) {
        drawAttempt(row, attempt, true);
        row = row.nextSibling;
    }
    drawAttempt(row, currentAttempt, false);
}

function drawAttempt(row, attempt, isPastAttempt) {
    for (let i=0; i<5; i++) {
        let cell = row.children[i];
        cell.textContent = attempt[i];
        if (isPastAttempt) {
            cell.style.backgroundColor = getBgColor(attempt, i);
        }
    }
}

// function drawCurrentAttempt(row, attempt) {
//     for (let i=0; i<5; i++) {
//         let cell = row.children[i];
//         cell.textContent = attempt[i] ?? '';
//     }
// }

function getBgColor(attempt, i) {
    const correctLetter = secret[i];
    const attemptedLetter = attempt[i];

    if (!attemptedLetter) {
        return '';
    }

    if (correctLetter === attemptedLetter) {
        // green
        return '#538d4e';
    }

    if (secret.indexOf(attemptedLetter) === -1 ) {
        // gray
        return '#303030';
    }

    // Yellow
    return '#b59f3b';
}
