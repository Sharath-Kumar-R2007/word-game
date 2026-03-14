const words = [
    { word: "apple", hint: "A common fruit, keeps the doctor away." },
    { word: "elephant", hint: "The largest land animal." },
    { word: "guitar", hint: "A stringed musical instrument." },
    { word: "python", hint: "A popular programming language and a snake." },
    { word: "mountain", hint: "A large natural elevation of the earth's surface." },
    { word: "galaxy", hint: "A massive gravitationally bound system of stars, gas, and dust." },
    { word: "nebula", hint: "A giant cloud of dust and gas in space." },
    { word: "astronaut", hint: "A person trained by a human spaceflight program to command, pilot, or serve as a crew member of a spacecraft." }
];

let selectedWord, hint, guessedLetters, wrongGuesses, maxWrong;

function startGame() {
    const random = words[Math.floor(Math.random() * words.length)];
    selectedWord = random.word.toLowerCase();
    hint = random.hint;
    guessedLetters = [];
    wrongGuesses = [];
    maxWrong = 6;
    document.getElementById('hint').textContent = `Hint: ${hint}`;
    document.getElementById('message').textContent = '';
    document.getElementById('message').className = '';
    document.getElementById('wrongGuesses').textContent = '';
    document.getElementById('guessInput').value = '';
    updateWordDisplay();
}

function updateWordDisplay(newlyGuessedLetter = null) {
    const wordDisplay = document.getElementById('wordDisplay');
    wordDisplay.innerHTML = '';
    
    for (let char of selectedWord) {
        const span = document.createElement('span');
        span.className = 'letter-box';
        
        if (guessedLetters.includes(char)) {
            span.textContent = char.toUpperCase();
            if (char === newlyGuessedLetter) {
                span.classList.add('letter-correct');
            }
        } else {
            span.textContent = '_';
        }
        wordDisplay.appendChild(span);
        // Add a space between letters
        const space = document.createTextNode(' ');
        wordDisplay.appendChild(space);
    }
}

function launchLetter(letter) {
    const launcher = document.createElement('div');
    launcher.textContent = letter.toUpperCase();
    launcher.className = 'launching-letter';
    
    // Position it roughly where the input is
    const inputRect = document.getElementById('guessInput').getBoundingClientRect();
    launcher.style.left = inputRect.left + (inputRect.width / 2) - 15 + 'px';
    launcher.style.top = inputRect.top + 'px';
    
    document.body.appendChild(launcher);
    
    setTimeout(() => {
        launcher.remove();
    }, 800);
}

function handleGuess() {
    const input = document.getElementById('guessInput');
    let guess = input.value.toLowerCase();
    input.value = '';
    input.focus();
    
    const msgEl = document.getElementById('message');
    
    if (!guess.match(/^[a-z]$/)) {
        msgEl.className = 'msg-error';
        msgEl.textContent = 'Enter a single letter!';
        shakeElement(msgEl);
        return;
    }
    if (guessedLetters.includes(guess) || wrongGuesses.includes(guess)) {
        msgEl.className = 'msg-error';
        msgEl.textContent = 'Letter already used!';
        shakeElement(msgEl);
        return;
    }
    
    launchLetter(guess);
    
    if (selectedWord.includes(guess)) {
        guessedLetters.push(guess);
        msgEl.className = 'msg-success';
        msgEl.textContent = 'Great shot!';
        updateWordDisplay(guess);
    } else {
        wrongGuesses.push(guess);
        msgEl.className = 'msg-error';
        msgEl.textContent = 'Missed!';
        shakeElement(msgEl);
    }
    
    document.getElementById('wrongGuesses').textContent = wrongGuesses.map(g => g.toUpperCase()).join(', ');
    
    if (!selectedWord.includes(guess)) {
        updateWordDisplay(); 
    }
    
    checkGameStatus();
}

function shakeElement(el) {
    el.style.animation = 'none';
    el.offsetHeight; /* trigger reflow */
    el.style.animation = null; 
}

function checkGameStatus() {
    const msgEl = document.getElementById('message');
    if (selectedWord.split('').every(char => guessedLetters.includes(char))) {
        msgEl.className = 'msg-success';
        msgEl.textContent = 'Mission Accomplished!';
        disableInput();
    } else if (wrongGuesses.length >= maxWrong) {
        msgEl.className = 'msg-error';
        msgEl.textContent = `Game Over! The word was "${selectedWord.toUpperCase()}".`;
        disableInput();
    }
}

function disableInput() {
    document.getElementById('guessInput').disabled = true;
    document.getElementById('guessBtn').disabled = true;
}

function enableInput() {
    document.getElementById('guessInput').disabled = false;
    document.getElementById('guessBtn').disabled = false;
    document.getElementById('guessInput').focus();
}

document.getElementById('guessBtn').addEventListener('click', handleGuess);
document.getElementById('guessInput').addEventListener('keyup', function(e) {
    if (e.key === 'Enter') handleGuess();
});
document.getElementById('restartBtn').addEventListener('click', function() {
    enableInput();
    startGame();
});

// Start the game on load
startGame();
