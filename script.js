const words = [
    { word: "apple", hint: "A common fruit, keeps the doctor away." },
    { word: "elephant", hint: "The largest land animal." },
    { word: "guitar", hint: "A stringed musical instrument." },
    { word: "python", hint: "A popular programming language and a snake." },
    { word: "mountain", hint: "A large natural elevation of the earth's surface." }
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
    document.getElementById('wrongGuesses').textContent = '';
    document.getElementById('guessInput').value = '';
    updateWordDisplay();
}

function updateWordDisplay() {
    let display = '';
    for (let char of selectedWord) {
        if (guessedLetters.includes(char)) {
            display += char + ' ';
        } else {
            display += '_ ';
        }
    }
    document.getElementById('wordDisplay').textContent = display.trim();
}

function handleGuess() {
    const input = document.getElementById('guessInput');
    let guess = input.value.toLowerCase();
    input.value = '';
    if (!guess.match(/^[a-z]$/)) {
        document.getElementById('message').textContent = 'Please enter a single letter.';
        return;
    }
    if (guessedLetters.includes(guess) || wrongGuesses.includes(guess)) {
        document.getElementById('message').textContent = 'You already guessed that letter!';
        return;
    }
    if (selectedWord.includes(guess)) {
        guessedLetters.push(guess);
        document.getElementById('message').textContent = 'Correct!';
    } else {
        wrongGuesses.push(guess);
        document.getElementById('message').textContent = 'Wrong!';
    }
    document.getElementById('wrongGuesses').textContent = wrongGuesses.join(', ');
    updateWordDisplay();
    checkGameStatus();
}

function checkGameStatus() {
    if (selectedWord.split('').every(char => guessedLetters.includes(char))) {
        document.getElementById('message').textContent = 'Congratulations! You guessed the word!';
        disableInput();
    } else if (wrongGuesses.length >= maxWrong) {
        document.getElementById('message').textContent = `Game Over! The word was "${selectedWord}".`;
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
