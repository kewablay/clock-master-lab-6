const clock = {
  is24HourFormat: true,
  alarmTime: null,

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
    let hours = this.hours % 12 || 12;
    let period = this.hours >= 12 ? "PM" : "AM";

    const template = `
          <div class="flex gap-4">
              <!-- time -->
              <h1 class="text-7xl" style="font-family: var(--ff-Rubrik)">
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
                <p class="text-[#949d9c] font-bold">${period}</p>
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
              <h1 class="text-7xl " style="font-family: var(--ff-Rubrik) ">
                <span style="color: var(--clr-orange)">${hours
                  .toString()
                  .padStart(2, "0")}</span> :
                <span class="ml-1">${this.minutes
                  .toString()
                  .padStart(2, "0")}</span>
              </h1>
  
              <!-- second and am-pm -->
              <div class="space-y-0 shrink-0 w-10 items-center justify-center  flex flex-col">
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

  setAlarm(hours, minutes, seconds) {
    this.alarmTime = { hours, minutes, seconds };
    console.log(
      `Alarm set for ${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    );
  },

  checkAlarm() {
    if (
      this.alarmTime &&
      this.hours === this.alarmTime.hours &&
      this.minutes === this.alarmTime.minutes &&
      this.seconds === this.alarmTime.seconds
    ) {
      alert("Alarm!");
      this.alarmTime = null; // reset alarm after it triggers
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

    // show the button which is currently active
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

clock.is24HourFormat = true; // Set initial format to 24-hour
clock.updateClock();
setInterval(() => clock.updateClock(), 1000);

document
  .getElementById("button12hr")
  .addEventListener("click", () => clock.toggleFormat("12hr"));
document
  .getElementById("button24hr")
  .addEventListener("click", () => clock.toggleFormat("24hr"));

clock.updateButtons(); // Initialize button styles
