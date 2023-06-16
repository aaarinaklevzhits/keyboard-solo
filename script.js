const word = document.querySelector('.word');
const correctCount = document.querySelector('.correct-count');
const wrongCount = document.querySelector('.wrong-count');
const wordMistakes = document.querySelector('.word-mistakes');
const timer = document.querySelector('#timer');

const words = ['apple', 'apricot', 'mango', 'persimmon', 'pomegranate', 'plum', 'orange'];

function getRandomWord(arr) {
    const randomWord = Math.floor(Math.random() * arr.length);
    return arr[randomWord];
}


function leadRandomWord() {

    const randomWord = getRandomWord(words);
    word.innerHTML = '';
    const fragment = new DocumentFragment();

    randomWord.split('').forEach(item => {

        const letter = document.createElement('span');
        letter.textContent = item;

        fragment.append(letter);

    });

    word.append(fragment);
}

leadRandomWord();


let i = 0;
let mistake = 0;
let correct = 0;
let wrong = 0;

document.addEventListener('keydown', function(event) {

    let element = word.querySelectorAll("span");

    if (event.key === element[i].textContent) {
        element[i].className = 'c';
        i++;
    } else {
        element[i].className = 'w';
        mistake++;
        wordMistakes.textContent = mistake;
    }


    if (i === element.length) {

        if (mistake !== 0) {
            wrong++;
            wrongCount.textContent = wrong;

        } else {
            correct++;
            correctCount.textContent = correct;
        }

        leadRandomWord();
        wordMistakes.textContent = '0';
        mistake = 0;
        i = 0;
    }

    if (correct === 5) {
        alert(`Ура, ты выиграла! Твое время: ${timer.textContent}`);
        newAttempt();
    } else if (wrong === 5) {
        alert(`Не расстраивайся, попробуй снова. Твое время: ${timer.textContent}`);
        newAttempt();
    }

})

function newAttempt() {
    timer.innerHTML = '';
    timer.textContent = '00:00';
    correct = 0;
    wrong = 0;
    word.innerHTML = '';
    wrongCount.textContent = '0';
    correctCount.textContent = '0';
    leadRandomWord();
}

let timerId = setInterval(() => {
    let minutes = +timer.textContent.split(":")[0];
    let seconds = +timer.textContent.split(":")[1];

    if (seconds !== 59) {
        seconds++;
    } else if (seconds === 59) {
        minutes++;
        seconds = 0;
    };


    if (seconds < 10) {
        seconds = `0${seconds}`;
    };
    if (minutes < 10) {
        minutes = `0${minutes}`;
    };

    timer.textContent = `${minutes}:${seconds}`;

    if (correct === 5 || wrong === 5) {
        clearInterval(timerId);
    }

}, 1000);