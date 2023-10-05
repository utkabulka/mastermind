const numberInput = document.querySelector(".number-input");
const guessButton = document.querySelector(".guess-button")

const numberLength = 4;

let generatedNumber;

numberInput.maxlength = numberLength;
generateNumber();

guessButton.onclick = () => {
    let input = numberInput.value;
    if (input.length != numberLength) {
        console.log("Invalid length of the input!");
    }
    else {
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
        // numberInput.value = "";
    }
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
