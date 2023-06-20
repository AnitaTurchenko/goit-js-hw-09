import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('button[data-start]');
const input = document.querySelector("#datetime-picker")
startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
  };
  flatpickr(input, options);
  

const timer = {
    start() {
        const startTime = Date.now();
        setInterval(() => {
            let currentTime = Date.now();
            const deltaTime = startTime - currentTime;
            const {hours, mins, secs} = getTimeComponents(deltaTime);

            console.log(`${hours}:${mins}:${secs}`);
        },1000);
    }
};
timer.start();

function getTimeComponents(time) {
    const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
    return {hours, mins, secs};
}

function pad(value) {
    return String(value).padStart(2, '0');
};