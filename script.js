// Declare variables for the stopwatch
let timer;
let isRunning = false;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapCounter = 1;

// Function to start or stop the stopwatch
function startStop() {
  if (isRunning) {
    // If running, stop the timer and update button text
    clearInterval(timer);
    document.getElementById("startStopBtn").textContent = "Start";
  } else {
    // If not running, start the timer and update button text
    timer = setInterval(updateTime, 10);
    document.getElementById("startStopBtn").textContent = "Stop";
  }
  // Toggle the running state
  isRunning = !isRunning;
}

// Function to record lap times
function lap() {
  if (isRunning) {
    // If running, record lap time and create a new lap item
    const lapTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(
      milliseconds
    )}`;
    const lapList = document.getElementById("lapList");
    const lapItem = document.createElement("li");
    lapItem.classList.add("lap");

    // Add alternative class for every second lap
    if (lapCounter % 2 === 0) {
      lapItem.classList.add("alternative");
    }

    // Populate lap item with lap number and lap time
    lapItem.innerHTML = `
      <p>Lap ${lapCounter}</p>
      <p>${lapTime}</p>
    `;
    // Append lap item to the lap list and show the list
    lapList.appendChild(lapItem);
    lapList.classList.remove("hidden");
    lapCounter++;
  }
}

// Function to reset the stopwatch
function reset() {
  // Clear the timer, reset variables, update display, and button text
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

// Function to update time during each timer tick
function updateTime() {
  milliseconds += 1;
  if (milliseconds === 100) {
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
  // Update the display with the current time
  updateDisplay();
}

// Function to update the displayed time
function updateDisplay() {
  const display = document.getElementById("display");
  display.textContent = `${pad(hours)} : ${pad(minutes)} : ${pad(
    seconds
  )}.${pad(milliseconds)}`;
}

// Function to pad single-digit values with a leading zero
function pad(value) {
  return value < 10 ? "0" + value : value;
}

// Initial display setup
updateDisplay();

// Function to update the header with current date, time, and stopwatch title
function updateHeader() {
  const header = document.getElementById("timerHeader");
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const currentDateTime = currentDate.toLocaleDateString("en-US", options);

  // Update header content with current time, stopwatch title, and date
  header.innerHTML = `
    <p>${currentTime}</p>
    <p> S  T <i class="fa-solid fa-clock"></i>
       P  W  A  T  C  H </p>
    <p>${currentDateTime}</p>`;
}

// Update header every tick (interval of 0 milliseconds for continuous update)
setInterval(updateHeader, 0);
