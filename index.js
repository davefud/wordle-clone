'use strict'

let wordList = [
    'patio',
    'darts',
    'amend',
    'solar',
    'sonar',
    'piano',
    'horse',
    'tough',
    'house',
    'pizza',
    'carbs',
    'shire',
    'panic',
    'crabs',
    'swipe',
    'tangy',
    'abbey',
    'favor',
    'drink',
    'sleep',
    'query',
    'gorge',
    'crank',
    'slump',
    'banal',
    'tiger',
    'siege',
    'sheep',
    'truss',
    'boost',
    'rebus',
    'fauna'
];

let randomIndex = Math.floor(Math.random() * wordList.length);
let secret = wordList[randomIndex];

let currentAttempt = '';
let history = [
    // 'farts',
    // 'rohan',
    // 'moldy',
    // 'after'
];

console.log(`secret is '${secret}'`);
console.log(`history is '${history}'`);
console.log(`currentAttempt is '${currentAttempt}'`);

let grid = document.getElementById('grid');

buildGrid();
updateGrid();

window.addEventListener('keydown', onKeyDown);

function onKeyDown(e) {
    const key = e.key.toLowerCase();
    const attemptLength = currentAttempt.length;

    if (attemptLength === 5 && key === 'enter') {
        if (!wordList.includes(currentAttempt)) {
            showAlert();
            return;
        }
        history.push(currentAttempt);
        currentAttempt = '';
    }
    if (attemptLength > 0 && key === 'backspace') {
        currentAttempt = currentAttempt.slice(0, -1);
    }

    if (attemptLength < 5 && key.length === 1) {
        if (/[a-z]/.test(key)) {
            currentAttempt += key;
        }
    }

    updateGrid();
    console.log(currentAttempt);
}

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
        } else {
            if (cell.textContent) {
                highlightCell(cell, true);
            } else {
                highlightCell(cell, false);
            }
        }
    }
}

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

function showAlert() {
    const alertElement = document.getElementById('word-error');
    alertElement.style.visibility = 'visible';
    setTimeout(() => {alertElement.style.visibility = 'hidden'}, 1500);
}

function highlightCell(cell, on) {
    if (on) {
        cell.style.borderColor = '#747478';
    } else {
        cell.style.borderColor = '#3a3a3c';
    }
}