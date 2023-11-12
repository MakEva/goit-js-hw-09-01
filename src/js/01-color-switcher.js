const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
const bodyEl = document.querySelector(".body");

let timerId = null;
stopBtn.disabled = true;

startBtn.addEventListener("click", onStartBtnClick);
stopBtn.addEventListener("click", onStopBtnClick);

function onStartBtnClick() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
   
    timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
};

function onStopBtnClick() {
    clearInterval(timerId);
    
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}