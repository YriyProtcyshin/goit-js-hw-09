const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onStartButton);
stopBtn.addEventListener('click', onEndButton);

let intervalId = null;

function onStartButton() {
  const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  body.style.backgroundColor = color;
  startBtn.disabled = true;
  intervalId = setTimeout(() => {
    onStartButton();
  }, 1000);
}

function onEndButton() {
  clearTimeout(intervalId);
  startBtn.disabled = false;
}
