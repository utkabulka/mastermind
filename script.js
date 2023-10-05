const numberInput = document.querySelector(".number-input");
const guessButton = document.querySelector(".guess-button")

let generatedNumber;

generateNumber();

guessButton.onclick = () => {
    let input = numberInput.value;
    if (input.length != 4) {
        console.log("Invalid length of the input!");
    }
    else {
        numberInput.value = "";
    }
}

function generateNumber() {
    generatedNumber = "";
    for (let i = 0; i < 4; i++) {
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
