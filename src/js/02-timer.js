import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    inputEl: document.querySelector("#datetime-picker"),
    startBtn: document.querySelector("[data-start]"),
    timerEl: document.querySelector(".timer"),
};

refs.startBtn.disabled = true;
let selectedDate = null;
let currentDate = new Date();
const timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  dateFormat: "Y-m-d H:m",
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
    if (selectedDate <= currentDate) {
        alert("Please choose a date in the future");
        refs.startBtn.disabled = true;
      } else {
        refs.startBtn.disabled = false;
      }
  },
};

flatpickr(refs.inputEl, options);

refs.startBtn.addEventListener("click", onStartBtnClick);

function onStartBtnClick() {
  setInterval(() => {
    const ms = selectedDate - currentDate;
    return ms;
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

  return { days, hours, minutes, seconds };
}

function addLeadingZero({ days, hours, minutes, seconds }) {

}

