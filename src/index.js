'use strict'

const wordList = WORDS;
let randomIndex = Math.floor(Math.random() * wordList.length);
let secret = wordList[randomIndex];

let secretMap = new Map();

let currentAttempt = '';
let history = [];
let gameState = 'playing';
const GREEN = '#538d4e';
const GRAY = '#303030';
const YELLOW = '#b59f3b';

const LIGHTGRAY = '#818384';
const BORDER_NORMAL = '#3a3a3c';
const BORDER_HIGHLIGHT = '#747478';

const messages = ['Genius', 'magnificent', 'Impressive', 'Splendid', 'Great', 'Phew'];

function onKeyDown(e) {
    const key = e.key.toLowerCase();
    handleKey(key);
}

function buildGrid() {
    for (let i=0; i<6; i++) {
        let row = document.createElement('div');
        row.className = 'grid-row';
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

function buildKeyboardRow(letters, lastLine) {
    let row = document.createElement('div');
    row.className = 'row';
    if (lastLine) {
        let enterKey = document.createElement('button');
        enterKey.id = 'create';
        enterKey.textContent = 'ENTER';
        enterKey.className = 'button ctrl-key';
        enterKey.onclick = () => {
            handleKey('enter');
        };
        row.appendChild(enterKey);
    }
    for (let letter of letters) {
        let button = document.createElement('button');
        button.id = letter;
        button.textContent = letter;
        button.className = 'button letter';
        button.onclick = () => {
            handleKey(letter);
        };
        row.appendChild(button);
    }
    if (lastLine) {
        let backspaceKey = document.createElement('button');
        backspaceKey.id = 'backspace';
        backspaceKey.className = 'button ctrl-key';
        backspaceKey.textContent = 'BACKSPACE';
        backspaceKey.onclick = () => {
            handleKey('backspace');
        };
        row.appendChild(backspaceKey);
    }
    let keyboard = document.getElementById('keyboard');
    keyboard.appendChild(row);
}

function getBetterColor(a, b) {
    if (a === GREEN || b === GREEN) {
        return GREEN;
    }
    if (a === YELLOW || b === YELLOW) {
        return YELLOW;
    }
    return GRAY;
}

function updateKeyboard() {
    const letters = currentAttempt.split('');
    for (let i=0; i<letters.length; i++) {
        const letter = document.getElementById(letters[i]);
        let color = getBgColor(currentAttempt, i);
        let secretColor = secretMap.get(letters[i]);
        let bestColor = getBetterColor(color, secretColor);

        if (secretMap.has(letters[i])) {
            secretMap.set(letters[i], bestColor);
        }
        letter.style.backgroundColor = bestColor;
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
    if (!row || history.length > 6) {
        return;
    }
    for (let i=0; i<5; i++) {
        let cell = row.children[i];
        cell.textContent = attempt[i];
    }
    for (let i=0; i<5; i++) {
        let cell = row.children[i];
        cell.textContent = attempt[i];
        if (isPastAttempt) {
            setTimeout(() => {
                cell.className = 'cell flip';
                setTimeout(() => { cell.style.backgroundColor = getBgColor(attempt, i); }, 300);
            }, 100 * i);
            
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

    if (!secret.includes(attemptedLetter)) {
        return GRAY;
    }

    const secretLetterCount = secret.split(attemptedLetter).length - 1;
    const attemptLetterCount =  attempt.split(attemptedLetter).length - 1;
    if (attemptLetterCount > secretLetterCount) {
        const firstIndex = attempt.indexOf(attemptedLetter);
        if (i > firstIndex) {
            return GRAY;
        }
    }

    return YELLOW;
}

function showAlert(message) {
    const alertElement = document.getElementById('word-error');
    alertElement.textContent = message;
    alertElement.style.visibility = 'visible';
    setTimeout(() => {alertElement.style.visibility = 'hidden'}, 1800);
}

function highlightCell(cell, on) {
    if (on) {
        cell.style.borderColor = BORDER_HIGHLIGHT;
    } else {
        cell.style.borderColor = BORDER_NORMAL;
    }
}

function handleKey(key) {
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
        localStorage.setItem('attempts', JSON.stringify(history));
        updateKeyboard();
        currentAttempt = '';
        
        const success = attemptIsCorrect();
        if (success || history.length > 5) {
            gameState = 'complete';
            localStorage.setItem('gameState', 'complete');
            const message = getMessage(success);
            setTimeout(() => showAlert(message), 1250);
        
        }

    }
    if (key === 'backspace') {
        currentAttempt = currentAttempt.slice(0, -1);
    }

    if (attemptLength < 5) {
        if (/^[a-z]$/.test(key)) {
            currentAttempt += key;
        }
    }

    updateGrid();
}

function attemptIsCorrect() {
    for (const value of secretMap.values()) {
        if (value !== GREEN) {
            return false;
        }
    }
    return true;
}

function getMessage(success) {
    if (success) {
        return messages[history.length - 1];
    } else {
        return secret;
    }
}

function initBestMatch() {
    // Remove duplicate letters in secret
    let secretSet = new Set(secret);
    for (let letter of secretSet) {
        secretMap.set(letter, GRAY);
    }
}

function initGame() {
    const savedSecret = localStorage.getItem('secret');
    const savedHistory = localStorage.getItem('attempts');
    const savedGameState = localStorage.getItem('gameState');
    if (savedSecret) {
        secret = savedSecret;
    } else {
        localStorage.setItem('secret', secret);
    }
    
    console.log(`secret is '${secret}'`);
    
    if (savedHistory) {
        history = JSON.parse(savedHistory);
        for (let attempt of history) {
            currentAttempt = attempt;
            updateKeyboard(); 
        }
    }

    if (savedGameState && (gameState === 'playing' || gameState === 'complete')) {
        gameState = savedGameState;
    } else {
        localStorage.setItem('gameState', gameState);
    }
    currentAttempt = '';
}

let grid = document.getElementById('grid');
let keyboard = document.getElementById('keyboard');

buildGrid();
buildKeyboard();
initBestMatch();
initGame();
updateGrid();

window.addEventListener('keydown', onKeyDown);