import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const input = document.querySelector("#datetime-picker");
const dayEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
let timerId = null;
let selectedTime;
startBtn.disabled = true;
let resetBtn;
createBtnReset();
resetBtn.disabled = true;
// const currentTime = Date.now();
// console.log(currentTime);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        selectedTime = selectedDates[0].getTime();
        // console.log(selectedDates[0].getTime());

      if (Date.now() > selectedTime) {
        startBtn.disabled = true;
        Notiflix.Notify.failure("Please choose a date in the future");
        return;
      };
        startBtn.disabled = false;
  }
};

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

function startTimer() {
    timerId = setInterval(() => {

        startBtn.disabled = true;
        input.disabled = true;
        resetBtn.disabled = false;
        const currentTime = Date.now();
        const difTime = selectedTime - currentTime;
        let numbers = convertMs(difTime);

        dayEl.textContent = numbers.days;
        hoursEl.textContent = numbers.hours;
        minutesEl.textContent = numbers.minutes;
        secondsEl.textContent = numbers.seconds;

        if (dayEl.textContent === "00" &&
        hoursEl.textContent === "00" &&
        minutesEl.textContent === "00" &&
        secondsEl.textContent === "00") {
        clearInterval(timerId);
        input.disabled = false;
        resetBtn.disabled = true;
        startBtn.disabled - true;
        return;
    }
    },1000);
    
}

flatpickr(input, options);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = pad(Math.floor(ms / day));
    const hours = pad(Math.floor((ms % day) / hour));
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  };

function pad(value) {
    return String(value).padStart(2, '0');
};

function createBtnReset() {
    resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset";
    startBtn.insertAdjacentElement("afterend", resetBtn);
};

function resetTimer() {
    resetBtn.disabled = true;
    startBtn.disabled = true;
    input.disabled = false;
    clearInterval(timerId);
    dayEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
}