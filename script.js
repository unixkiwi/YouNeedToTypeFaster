const wordList = `the of and a to in is you that it he was for on are as with his they be at one have this from or by not but all she would there we say who make like him into time if only my could no them see other than then now look more write go down day did get come made may part over new after said use two how our work first well way even because any these give day most us such through just form much know your than should call world each last right take place before little work big hand think say help where put home water room mother father school friend life year high small large great old young same man woman child people family group good bad happy sad easy hard love hate want need like see hear feel touch taste smell go come stay leave start stop begin end find lose keep give read write speak listen talk play watch sing dance city town country state place car bus train plane boat food drink eat cook bake sun moon star sky earth hot cold warm cool dry wet fast slow quick light dark bright clean safe true false right wrong open closed full yes no maybe always never first last next day night week month year time money job work school book phone music art science history travel health nature friend love group law peace joy sad fear anger trust hope dream goal risk choice action thought fact story memory change growth`;

const words = document.getElementById("words");
const restartBtn = document.getElementById("restartBtn");
const wordCountInput = document.getElementById("wordCount");

restartBtn.addEventListener('click', restartBtnFunction);

const byID = (id) => document.getElementById(id);

let textWordCount = 10;

let firstType = true;

let text;
let index;

let timeStart;
let timeEnd;

let isEndScreen;
let isStartScreen;

setup();

document.body.addEventListener('keydown', (e) => {
    if (e.key.length != 1 && e.key !== "Backspace" || isEndScreen || isStartScreen) return;

    if (firstType) {
        timeStart = new Date().getTime();
        firstType = false;
    }

    if (e.key == text[index]) {
        changeStyle(index, '#10FF10');
        index++;
        if (!(index >= text.length)) changeStyle(index, 'white', '#555');
    } else if (e.key === "Backspace") {
        if (index == 0) return;

        changeStyle(index, 'gray');
        index--;
        changeStyle(index, 'white', '#555')
    } else {
        if (text[index] === " ") changeStyle(index, 'red', 'lightcoral');
        else changeStyle(index, '#FF1010');

        index++;
        if (!(index >= text.length)) changeStyle(index, 'white', '#555');
    }

    if (index == text.length) end();
});

function setStartScreen() {
    wordCountInput.style.display = 'block';
    restartBtn.style.display = 'block';
    words.style.filter = 'blur(5px)';
}

function setup() {
    isStartScreen = true;

    if (!(wordCountInput.value === "" || isNaN(wordCountInput.value))) {
        textWordCount = parseInt(wordCountInput.value);
    } else textWordCount = 25;

    isEndScreen = false;

    firstType = true;

    text = "";

    words.innerHTML = "";

    setStartScreen();

    timeStart = 0;
    timeEnd = 0;

    index = 0;

    let newWordIndex = 0;

    for (let wcIt = 0; wcIt < textWordCount; wcIt++) {
        let rndIndex = Math.floor(Math.random() * wordList.split(" ").length);

        let tmpWord = wordList.split(" ")[rndIndex];

        for (let tmpChar of tmpWord) {
            words.innerHTML += `<span id="element${newWordIndex}" style="color: grey;">${tmpChar}</span>`;
            newWordIndex++;

            text += tmpChar;
        }

        if (!(wcIt == textWordCount - 1)) {
            words.innerHTML += `<span id="element${newWordIndex}" style="color: grey;"> </span>`;
            text += " ";
            
            newWordIndex++;
        } 
    }
}

function start() {
    isStartScreen = false;
    words.style.filter = 'blur(0px)';
    restartBtn.style.display = 'none';
    wordCountInput.style.display = 'none';
}

function restartBtnFunction() {
    setup();
    start();
    document.getElementById("wordsInput").focus();
}

function end() {
    words.style.filter = "none";
    restartBtn.style.display = "none";

    isEndScreen = true;

    timeEnd = new Date().getTime();

    let time = timeEnd - timeStart;

    let wordCount = text.split(" ").length;

    let wpm = wordCount / (time / 60000)

    words.innerHTML = `<p><span class="primary">Time: </span>${(time/1000).toFixed(2)}s\n
    <span class="primary">WPM:</span> ${wpm.toFixed(2)}WPM</p>
    <button onclick="setup()" id="endRestartBtn">Restart</button>`;
}

function changeStyle(index, color, bgColor = 'transparent') {
    byID(`element${index}`).style.color = color;
    byID(`element${index}`).style.backgroundColor = bgColor;
    byID(`element${index}`).style.borderRadius = "3px";
}
