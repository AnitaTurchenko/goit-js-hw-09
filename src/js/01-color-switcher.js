const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector("body");
let timerId = null;

startBtn.addEventListener("click", startChangeColor);
stopBtn.addEventListener("click", stopChangeColor);
stopBtn.disabled = true;

function startChangeColor() {   
    startBtn.disabled = true;
    stopBtn.disabled = false;
    timerId = setInterval(() => {
    let colorBody = getRandomHexColor();
    bodyEl.style.backgroundColor = colorBody;
       }, 1000);
};

function stopChangeColor() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(timerId);
};


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};