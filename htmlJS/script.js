const clockEl = document.getElementById("clock");
const dateEl = document.getElementById("dateText");
const timezoneButtons = document.getElementById("timezoneButtons");
const languageButtons = document.getElementById("languageButtons");
const timezoneLabel = document.getElementById("timezoneLabel");
const languageLabel = document.getElementById("languageLabel");

let selectedTimeZone = "America/New_York";
let selectedLocale = "en-US";

const uiText = {
  "en-US": {
    timezone: "Time Zone",
    language: "Language"
  },
  "fr-FR": {
    timezone: "Fuseau horaire",
    language: "Langue"
  }
};

function updateClock() {
  const now = new Date();
  const timeParts = new Intl.DateTimeFormat("en-US", {
    timeZone: selectedTimeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).formatToParts(now);

  const hh = timeParts.find((part) => part.type === "hour")?.value ?? "00";
  const mm = timeParts.find((part) => part.type === "minute")?.value ?? "00";
  const ss = timeParts.find((part) => part.type === "second")?.value ?? "00";

  clockEl.textContent = `${hh}:${mm}:${ss}`;

  const dateString = now.toLocaleDateString(selectedLocale, {
    timeZone: selectedTimeZone,
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  });

  dateEl.textContent = dateString;
}

function setActiveButton(container, attrName, value) {
  const buttons = container.querySelectorAll("button");
  buttons.forEach((button) => {
    if (button.dataset[attrName] === value) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

function updateUILabels() {
  timezoneLabel.textContent = uiText[selectedLocale].timezone;
  languageLabel.textContent = uiText[selectedLocale].language;
}

timezoneButtons.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-timezone]");
  if (!button) {
    return;
  }

  selectedTimeZone = button.dataset.timezone;
  setActiveButton(timezoneButtons, "timezone", selectedTimeZone);
  updateClock();
});

languageButtons.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-locale]");
  if (!button) {
    return;
  }

  selectedLocale = button.dataset.locale;
  setActiveButton(languageButtons, "locale", selectedLocale);
  updateUILabels();
  updateClock();
});

updateUILabels();
updateClock();
setInterval(updateClock, 1000);
