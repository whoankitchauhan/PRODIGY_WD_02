let timer;
let isRunning = false;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapCounter = 1;

function startStop() {
  if (isRunning) {
    clearInterval(timer);
    document.getElementById("startStopBtn").textContent = "Start";
  } else {
    timer = setInterval(updateTime, 10);
    document.getElementById("startStopBtn").textContent = "Stop";
  }
  isRunning = !isRunning;
}

function lap() {
  if (isRunning) {
    const lapTime = `${pad(hours)}:${pad(minutes)}:${pad(
      seconds
    )}.${padMilliseconds(milliseconds)}`;
    const lapList = document.getElementById("lapList");
    const lapItem = document.createElement("li");
    lapItem.classList.add("lap");

    // Toggle .alternative class for every second lap
    if (lapCounter % 2 === 0) {
      lapItem.classList.add("alternative");
    }

    lapItem.innerHTML = `
      <p>Lap ${lapCounter}</p>
      <p>${lapTime}</p>
    `;
    lapList.appendChild(lapItem);
    lapList.classList.remove("hidden");
    lapCounter++;
  }
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  lapCounter = 1;
  updateDisplay();
  document.getElementById("startStopBtn").textContent = "Start";
  document.getElementById("lapList").innerHTML = "";
  document.getElementById("lapList").classList.add("hidden");
}

function updateTime() {
  milliseconds += 10;
  if (milliseconds === 1000) {
    milliseconds = 0;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
    }
  }
  updateDisplay();
}

function updateDisplay() {
  const display = document.getElementById("display");
  display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(
    seconds
  )}.${padMilliseconds(milliseconds)}`;
}

function padMilliseconds(value) {
  return value < 10
    ? "00" + value
    : value < 100
    ? "0" + value
    : ("" + value).slice(-3);
}

function pad(value) {
  return value < 10 ? "0" + value : value;
}

// Initial display
updateDisplay();

// Update header with current time
function updateHeader() {
  const header = document.getElementById("timerHeader");
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString();
  header.textContent = `${currentTime}`;
}

// Update header every second
setInterval(updateHeader, );
