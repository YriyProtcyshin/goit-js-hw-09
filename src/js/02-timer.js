import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Ukrainian } from 'flatpickr/dist/l10n/uk.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// ================== Global variables =============================

let selectedDate = null;
// let timerId = null;

// link to html elements
const ref = {
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

// Flatpickr options
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  locale: Ukrainian,

  onChange(date) {
    selectedDate = new Date(date);
    onChangeDate();
  },
  onClose(date) {
    selectedDate = new Date(date);
    onCloseCalendar();
  },
};
// ==================================================================

flatpickr('#datetime-picker', options);

ref.startBtn.disabled = true;

ref.startBtn.addEventListener('click', onTimer);

// =================================================================
//                   Function  declaration
// =================================================================

// закрытие календаря
function onCloseCalendar() {
  const dateNow = Date.now();
  if (selectedDate <= dateNow) {
    Notify.failure('Please choose a date in the future', {
      position: 'center-top',
    });
    // window.alert('Please choose a date in the future');
    ref.startBtn.disabled = true;
  }
}

// изменение даты в календаре
function onChangeDate() {
  const dateNow = Date.now();
  if (selectedDate <= dateNow) {
    ref.startBtn.disabled = true;
  } else {
    ref.startBtn.disabled = false;
  }
}

// запуск таймера
// --------------------------------------------------------------
function onTimer() {
  ref.startBtn.disabled = true; // button disabled

  const timerId = setInterval(() => {
    changeTimer(timerId);
  }, 1000);
}

function changeTimer(timerId) {
  const dateNow = new Date();

  changeHtml(convertMs(selectedDate - dateNow));

  // если время истекло
  if (selectedDate - dateNow < 1000) {
    clearInterval(timerId);
  }
}
//----------------------------------------------------------------

// получение день, час, минут и сек из количества миллисекунд
//  convertMs(1665324934298) => {days, hours, minutes, seconds}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// вставка данных в html
function changeHtml({ days, hours, minutes, seconds }) {
  ref.daysEl.innerHTML = dateToPadString(days);
  ref.hoursEl.innerHTML = dateToPadString(hours);
  ref.minutesEl.innerHTML = dateToPadString(minutes);
  ref.secondsEl.innerHTML = dateToPadString(seconds);
}

// преобразование элемента объекта в строку и добавление символа (padStart)
function dateToPadString(date) {
  return date.toString().padStart(2, '0');
}
