import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('button[data-start]');
const input = document.querySelector("#datetime-picker");
const dayEl = document.querySelector('button[data-days]');
const hoursEl = document.querySelector('button[data-hours]');
const minutesEl = document.querySelector('button[data-minutes]');
const secondsEl = document.querySelector('button[data-seconds]');
let timerId = null;
let selectedTime;
startBtn.disabled = true;
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
        return alert(`Choose date atfer current time`);
      };
        startBtn.disabled = false;
  }
};

startBtn.addEventListener('click', startTimer);

function startTimer() {
    timerId = setInterval(() => {
        const currentTime = Date.now();
        const difTime = selectedTime - currentTime;
        let numbers = convertMs(difTime);
        console.log(numbers);
        dayEl.textContent = numbers.days;
        hoursEl.textContent = numbers.hours;
        minutesEl.textContent = numbers.minutes;
        secondsEl.textContent = numbers.seconds;
    },1000)
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