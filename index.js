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
    'prios',
    'favor',
    'paper',
    'drink',
    'farts',
    'fight',
    'shark',
    'share',
    'holly',
    'sleep',
    'query',
    'gorge',
    'apple',
    'crank',
    'pique',
    'pears',
    'puppy',
    'modal',
    'slump',
    'banal',
    'tiger',
    'spend',
    'windy',
    'trend',
    'siege',
    'pious',
    'sheep',
    'fiend',
    'tolls',
    'pilot',
    'truss',
    'photo',
    'boost',
    'boron',
    'robot',
    'bosco',
    'rebus',
    'tight',
    'model',
    'money',
    'truth',
    'polar',
    'fauna',
    'peeps',
    'words',
    'babel',
    'peers',
    'speed',
    'trend',
    'night',
    'pixie',
    'ready',
    'hello',
    'rough',
    'rally',
    'topic',
    'faith',
    'pupil',
    'worst',
    'react',
    'reign',
    'after',
    'ready',
    'catch',
    'toast'
];

let randomIndex = Math.floor(Math.random() * wordList.length);
let secret = wordList[randomIndex];

console.log(`secret is '${secret}'`);

let currentAttempt = '';
let history = [];
let gameState = 'playing';
const GREEN = '#538d4e';
const GRAY = '#303030';
const YELLOW = '#b59f3b';

function onKeyDown(e) {
    const key = e.key.toLowerCase();
    const attemptLength = currentAttempt.length;
    if (gameState !== 'playing' || history.length > 6) {
        return;
    }

    if (key === 'enter') {
        if (attemptLength < 5) {
            showAlert('Not enough letters');
            return;
        }

        if (!wordList.includes(currentAttempt)) {
            showAlert('Not in word list');
            return;
        }

        history.push(currentAttempt);
        currentAttempt = '';
        if (history.length > 5) {
            // gameState = 'lost';
        }

    }
    if (attemptLength > 0 && key === 'backspace') {
        currentAttempt = currentAttempt.slice(0, -1);
    }

    if (attemptLength < 5) {
        if (/^[a-z]$/.test(key)) {
            currentAttempt += key;
        }
    }

    updateGrid();
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

function buildKeyboard() {
    buildKeyboardRow('qwertyuiop', false);
    buildKeyboardRow('asdfghjkl', false);
    buildKeyboardRow('zxcvbnm', true);
}

function buildKeyboardRow(keys, lastLine) {
    let row = document.createElement('div');
    row.style.height = '60px';
    let chars = keys.split('');
    if (lastLine) {
        let enterKey = document.createElement('button');
        enterKey.textContent = 'ENTER';
        enterKey.className = 'button ctrl-key';
        row.appendChild(enterKey);
        enterKey.addEventListener('click', onButtonClick);
    }
    for (let i=0; i<chars.length; i++) {
        let button = document.createElement('button');
        button.textContent = chars[i];
        button.className = 'button key';
        row.appendChild(button);
        button.addEventListener('click', onButtonClick);
    }
    if (lastLine) {
        let backspaceKey = document.createElement('button');
        backspaceKey.className = 'button ctrl-key';
        backspaceKey.textContent = 'DELETE';
        row.appendChild(backspaceKey);
        backspaceKey.addEventListener('click', onButtonClick);
    }
    let keyboard = document.getElementById('keyboard');
    keyboard.appendChild(row);
}

function onButtonClick(e) {
    console.log(e);
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
    if (!row || history.length > 6) {
        return;
    }
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
        return GREEN;
    }

    if (secret.indexOf(attemptedLetter) === -1 ) {
        return GRAY;
    }

    return YELLOW;
}

function showAlert(message) {
    const alertElement = document.getElementById('word-error');
    alertElement.textContent = message;
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

let grid = document.getElementById('grid');
let keyboard = document.getElementById('keyboard');

buildGrid();
buildKeyboard();
updateGrid();

window.addEventListener('keydown', onKeyDown);