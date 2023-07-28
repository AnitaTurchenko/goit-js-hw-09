import Notiflix from "notiflix";

const formEl = document.querySelector(".form");
const delayEl = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');

formEl.addEventListener("submit", submit);


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay});
        // Fulfill
      } else {
        reject({position, delay});
        // Reject
      }
    }, delay);
  });
}

function submit(e) {
e.preventDefault();

let delay = Number(delayEl.value);
let step = Number(stepEl.value);
let amount = Number(amountEl.value);

if (delay < 0 || step < 0 || amount <= 0) {
  Notiflix.Notify.failure(`Please enter a correct value`);
  return;
};

for (let i = 1; i <= amount; i += 1) {
  let position = i;
  createPromise(position, delay)
    .then(({position, delay}) => {
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({position, delay}) => {
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    });
    delay += step;
}
formEl.reset();
}