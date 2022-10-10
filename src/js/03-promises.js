import { Notify } from 'notiflix/build/notiflix-notify-aio';

// -----------------------------------------------------------------------
const delayInput = document.querySelector('[name="delay"]');
const stepInput = document.querySelector('[name="step"]');
const amountInput = document.querySelector('[name="amount"]');
const button = document.querySelector('[type="submit"]');
// ------------------------------------------------------------------------

button.addEventListener('click', onButtonClick);

//--------------------------------------------------------------------------
function onButtonClick(e) {
  e.preventDefault();
  let delay = Number(delayInput.value);

  setTimeout(() => {
    for (let i = 1; i <= amountInput.value; i += 1) {
      createPromise(i, delay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      delay += Number(stepInput.value);
    }
  }, delay);
}

// --------- Create Promise -------------------------------------------------
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
