import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    inputEl: document.querySelector("#datetime-picker"),
    startBtn: document.querySelector("[data-start]"),
    timerEl: document.querySelector(".timer"),
    daysEl: document.querySelector("[data-days]"),
    hoursEl: document.querySelector("[data-hours]"),
    minutesEl: document.querySelector("[data-minutes]"),
    secondsEl: document.querySelector("[data-seconds]")  
};

refs.startBtn.disabled = true;
refs.inputEl.disabled = false;
let selectedDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  dateFormat: "Y-m-d H:m",
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
    if (selectedDate <= Date.now()) {
      Notiflix.Notify.success("Please choose a date in the future");
      refs.startBtn.disabled = true;
      return;
      } else {
        refs.startBtn.disabled = false;
      }
  },
};

flatpickr(refs.inputEl, options);

refs.startBtn.addEventListener("click", onStartBtnClick);

function onStartBtnClick() {
  refs.startBtn.disabled = true;
  refs.inputEl.disabled = true;
 timerId = setInterval(() => {
   const ms = selectedDate - Date.now();
   
   convertMs(ms);

   if (ms <= 1000) {
     clearInterval(timerId);
      refs.daysEl.textContent = "00";
      refs.hoursEl.textContent = "00";
      refs.minutesEl.textContent = "00";
      refs.secondsEl.textContent = "00";
  }
  }, 1000);
  
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
 
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
  refs.daysEl.textContent = addLeadingZero(days);
  refs.hoursEl.textContent = addLeadingZero(hours);
  refs.minutesEl.textContent = addLeadingZero(minutes);
  refs.secondsEl.textContent = addLeadingZero(seconds);
  
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
