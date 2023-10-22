const numberInput = document.querySelector(".number-input");
const guessButton = document.querySelector(".guess-button");
const winContainer = document.querySelector(".content.win");
const triesText = document.querySelector("#tries");
const playAgainButton = document.querySelector(".play-again");
const guessesContainer = document.querySelector(".content.guesses");

const numberLength = 4;

let generatedNumber;

numberInput.maxlength = numberLength;

let previousInput = "";

let gameWon = false;
let guesses = 0;

resetGame();

guessButton.onclick = () => {
    let input = numberInput.value;
    if (gameWon == false) {
        // validation
        if (input.length != numberLength) {
            console.log("Invalid length of the input!");
            return;
        }
        
        if (input == previousInput) {
            console.log("Previous input is identical to current one!");
            return;
        }
        
        guesses++;
        if (guesses > 0) {
            guessesContainer.style.display = 'flex';
        }
        previousInput = input;

        // creating block with try description
        let softMatches = 0;
        let hardMatches = 0;
        for (let i = 0; i < numberLength; i++) {
            if (generatedNumber.charAt(i) == input.charAt(i)) {
                hardMatches++;
            }
            else if (generatedNumber.includes(`${input.charAt(i)}`)) {
                softMatches++;
            }
        }
        console.log(`Guess ${input} against ${generatedNumber}; SM: ${softMatches}; HM: ${hardMatches}`);
        createGuess(input, softMatches, hardMatches);

        // check if player guessed all numbers
        if (hardMatches == numberLength) {
            winGame();
        }
    }   
}

playAgainButton.onclick = () => resetGame();

function createGuess(input, softMatches, hardMatches) {
    let guessDiv = document.createElement('div');
    guessDiv.classList.add('guess');
    guessDiv.style.order = -guesses;

    let guessNumberDiv = document.createElement('div');
    guessNumberDiv.classList.add('guess-number');
    guessNumberDiv.textContent = input;
    guessDiv.appendChild(guessNumberDiv);

    let guessMatchesDiv = document.createElement('div');
    guessMatchesDiv.classList.add('guess-matches');
    guessMatchesDiv.innerHTML = `Soft: ${softMatches}<br>Hard: ${hardMatches}`;
    guessDiv.appendChild(guessMatchesDiv);

    guessesContainer.appendChild(guessDiv);
}

function winGame() {
    gameWon = true;
    triesText.textContent = `You got it in ${guesses} tries.`
    winContainer.style.display = 'flex';
}

function resetGame() {
    winContainer.style.display = 'none';
    guessesContainer.style.display = 'none';
    guessesContainer.innerHTML = '';

    previousInput = "";
    gameWon = false;
    guesses = 0;
    generateNumber();
}

function generateNumber() {
    generatedNumber = "";
    for (let i = 0; i < numberLength; i++) {
        let digit = Math.floor(Math.random() * 10);
        if (i > 0) {
            while (true) {
                digit = Math.floor(Math.random() * 10);
                if (!generatedNumber.includes(`${digit}`)) {
                    break;
                }
            }
        }
        generatedNumber = `${digit}` + `${generatedNumber}`;
    }
    console.log(`Generated a number: ${generatedNumber}`);
}
