const clock = {
  is24HourFormat: true,
  alarmTime: null,
  alarmSound: new Audio("alarm-sound.wav"), // Load the alarm sound

  updateClock() {
    const now = new Date();
    this.hours = now.getHours();
    this.minutes = now.getMinutes();
    this.seconds = now.getSeconds();
    this.displayTime();
    this.displayDayAndDate();
    this.checkAlarm();
  },

  displayTime() {
    const clockElement = document.getElementById("clock");
    if (this.is24HourFormat) {
      clockElement.innerHTML = this.get24HourTime();
    } else {
      clockElement.innerHTML = this.get12HourTime();
    }
  },

  get24HourTime() {

    const template = `
        <div class="flex gap-4">
          <!-- time -->
          <h1 class="text-6xl sm:text-7xl" style="font-family: var(--ff-Rubrik)">
            <span style="color: var(--clr-orange)">${this.hours
              .toString()
              .padStart(2, "0")}</span> :
            <span class="ml-1">${this.minutes
              .toString()
              .padStart(2, "0")}</span>
          </h1>
  
          <!-- second and am-pm -->
          <div class="space-y-0 shrink-0 w-10 items-center justify-center flex flex-col">
            <p class="text-3xl font-bold text-[#949d9c]">${this.seconds
              .toString()
              .padStart(2, "0")}</p>
            <p class="text-[#949d9c] font-bold"></p>
          </div>
        </div>
      `;

    return template;
  },

  get12HourTime() {
    let hours = this.hours % 12 || 12;
    let period = this.hours >= 12 ? "PM" : "AM";

    const template = `
        <div class="flex gap-4">
          <!-- time -->
          <h1 class="text-6xl sm:text-7xl" style="font-family: var(--ff-Rubrik)">
            <span style="color: var(--clr-orange)">${hours
              .toString()
              .padStart(2, "0")}</span> :
            <span class="ml-1">${this.minutes
              .toString()
              .padStart(2, "0")}</span>
          </h1>
  
          <!-- second and am-pm -->
          <div class="space-y-0 shrink-0 w-10 items-center justify-center flex flex-col">
            <p class="text-3xl font-bold text-[#949d9c]">${this.seconds
              .toString()
              .padStart(2, "0")}</p>
            <p class="text-[#949d9c] font-bold">${period}</p>
          </div>
        </div>
      `;
    return template;
  },

  displayDayAndDate() {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const now = new Date();
    const day = daysOfWeek[now.getDay()];
    const date = now.getDate();
    const month = now.toLocaleString("default", { month: "long" });
    const year = now.getFullYear();

    const dayElement = document.querySelector("h4");
    const dateElement = document.querySelector("p");

    dayElement.innerText = day;
    dateElement.innerText = `${date}${this.getOrdinalSuffix(
      date
    )} ${month} ${year}`;
  },

  getOrdinalSuffix(date) {
    if (date > 3 && date < 21) return "th"; // special case for 11-20
    switch (date % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  },

  openPopup() {
    console.log("opening popup");
    document.querySelector(".popup-container").classList.remove("hidden");
  },

  closePopup() {
    console.log("closing popup");
    document.querySelector(".popup-container").classList.add("hidden");
  },

  getAlarmTimeInput() {
    const alarmTimeInput = document.getElementById("alarm-time-input");
    const [hours, minutes] = alarmTimeInput.value.split(":").map(Number);
    const seconds = 0;
    return { hours, minutes, seconds };
  },

  setAlarm(hours, minutes, seconds) {
    this.alarmTime = { hours, minutes, seconds };
    let formattedTime;
    if (this.is24HourFormat) {
      formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      let period = hours >= 12 ? "PM" : "AM";
      let displayHours = hours % 12 || 12;
      formattedTime = `${displayHours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${period}`;
    }

    document.querySelector(
      "#alarm-time"
    ).innerHTML = `<p class="flex gap-2"> <img src="/icons/alarm-clock-orange.png" alt="alarm" /> ${formattedTime} </p>`;
  },

  checkAlarm() {
    if (
      this.alarmTime &&
      this.hours === this.alarmTime.hours &&
      this.minutes === this.alarmTime.minutes &&
      this.seconds === this.alarmTime.seconds
    ) {
      // If alarm is up, show alarm notification and play sound
      document.getElementById("alarm-notification").classList.remove("hidden");
      this.alarmSound.play(); // Play the alarm sound
      this.alarmTime = null; // Reset alarm after it triggers
      document.querySelector("#alarm-time").innerHTML = " "; // Set alarm time to empty string
    }
  },

  toggleFormat(format) {
    this.is24HourFormat = format === "24hr";
    this.updateClock();
    this.updateButtons();
  },

  updateButtons() {
    const button12hr = document.getElementById("button12hr");
    const button24hr = document.getElementById("button24hr");

    // Show the button which is currently active
    if (this.is24HourFormat) {
      button24hr.classList.add("bg-[#142a29]");
      button24hr.classList.remove("text-[#949d9c]");
      button12hr.classList.add("text-[#949d9c]");
      button12hr.classList.remove("bg-[#142a29]");
    } else {
      button12hr.classList.add("bg-[#142a29]");
      button12hr.classList.remove("text-[#949d9c]");
      button24hr.classList.add("text-[#949d9c]");
      button24hr.classList.remove("bg-[#142a29]");
    }
  },
};

clock.is24HourFormat = false; // Set initial format to 12-hour
clock.updateClock();
setInterval(() => clock.updateClock(), 1000);

document
  .getElementById("button12hr")
  .addEventListener("click", () => clock.toggleFormat("12hr"));
document
  .getElementById("button24hr")
  .addEventListener("click", () => clock.toggleFormat("24hr"));

document
  .querySelector("#close-popup")
  .addEventListener("click", () => clock.closePopup());

document
  .querySelector("#set-alarm-btn")
  .addEventListener("click", () => clock.openPopup());

document.querySelector("#alarm-input").addEventListener("submit", (e) => {
  e.preventDefault();
  const { hours, minutes, seconds } = clock.getAlarmTimeInput();
  clock.setAlarm(hours, minutes, seconds);
  clock.closePopup();
});

document
  .getElementById("close-notification-popup")
  .addEventListener("click", () => {
    document.getElementById("alarm-notification").classList.add("hidden");
    clock.alarmSound.pause(); // Pause the alarm sound
    clock.alarmSound.currentTime = 0; // Reset the sound to the beginning
  });

clock.updateButtons(); // Initialize button styles
