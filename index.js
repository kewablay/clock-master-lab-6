const clock = {
  is24HourFormat: true,
  alarmTime: null,

  updateClock() {
    const now = new Date();
    this.hours = now.getHours();
    this.minutes = now.getMinutes();
    this.seconds = now.getSeconds();
    this.displayTime();
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
            <h1 class="text-7xl" style="font-family: var(--ff-Rubrik)">
              <span style="color: var(--clr-orange)">${this.hours
                .toString()
                .padStart(2, "0")}</span> :
              <span class="ml-1">${this.minutes
                .toString()
                .padStart(2, "0")}</span>
            </h1>

            <!-- second and am-pm -->
            <div class="space-y-0 items-center justify-center flex flex-col">
              <p class="text-3xl font-bold text-[#949d9c]">${this.seconds
                .toString()
                .padStart(2, "0")}</p>
              <p class="text-[#949d9c] font-bold">AM</p>
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
};

clock.is24HourFormat = false; // Set to 12-hour format
clock.updateClock();
setInterval(() => clock.updateClock(), 1000);
