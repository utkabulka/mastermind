const numberInput = document.querySelector(".number-input");
const guessButton = document.querySelector(".guess-button")
const guessesContainer = document.querySelector(".content.guesses")

const numberLength = 4;

let generatedNumber;

numberInput.maxlength = numberLength;
generateNumber();

let previousInput = "";

guessButton.onclick = () => {
    let input = numberInput.value;
    
    if (input.length != numberLength) {
        console.log("Invalid length of the input!");
        return;
    }

    if (input == previousInput) {
        console.log("Previous input is identical to current one!");
        return;
    }

    previousInput = input;

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
}

function createGuess(input, softMatches, hardMatches) {
    let guessDiv = document.createElement('div');
    guessDiv.classList.add('guess');

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
