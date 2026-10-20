
const cover = document.getElementById("cover");
const invitation = document.getElementById("invitation");

const openButton = document.getElementById("openInvitation");
const backButton = document.getElementById("backToEnvelope");

// ----------------------------------
// WEDDING SETTINGS
// ----------------------------------

// Example date and time in Kabul time.
// Replace this with the real wedding date.
const weddingDate = "2026-11-20T18:00:00+04:30";

// Ceremony time shown on the invitation.
const ceremonyTime = "6:00 PM";

// ----------------------------------
// OPEN THE INVITATION
// ----------------------------------

let isOpening = false;
let countdownInterval = null;

function openInvitation() {
  if (isOpening) return;

  isOpening = true;
  cover.classList.add("opening");

  window.setTimeout(() => {
    cover.classList.add("leaving");

    window.setTimeout(() => {
      cover.classList.add("hidden");

      invitation.classList.add("visible");
      invitation.setAttribute("aria-hidden", "false");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      isOpening = false;
    }, 800);
  }, 1100);
}

openButton.addEventListener("click", openInvitation);

// ----------------------------------
// RETURN TO THE ENVELOPE
// ----------------------------------

backButton.addEventListener("click", () => {
  invitation.classList.remove("visible");
  invitation.setAttribute("aria-hidden", "true");

  cover.classList.remove("hidden", "opening", "leaving");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ----------------------------------
// SET CEREMONY TIME
// ----------------------------------

document.getElementById("ceremonyTime").textContent =
  ceremonyTime;

// ----------------------------------
// COUNTDOWN
// ----------------------------------

const dateElement = document.getElementById("eventDate");

const countdownElements = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};

const targetDate = new Date(weddingDate);

function formatNumber(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  if (Number.isNaN(targetDate.getTime())) {
    dateElement.textContent = "Please set a valid wedding date";
    return;
  }

  dateElement.textContent = targetDate.toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Kabul"
    }
  );

  const now = Date.now();
  const difference = targetDate.getTime() - now;

  if (difference <= 0) {
    countdownElements.days.textContent = "00";
    countdownElements.hours.textContent = "00";
    countdownElements.minutes.textContent = "00";
    countdownElements.seconds.textContent = "00";

    dateElement.textContent = "The wedding day has arrived!";
    clearInterval(countdownInterval);
    return;
  }

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (difference / 1000) % 60
  );

  countdownElements.days.textContent = days;
  countdownElements.hours.textContent = formatNumber(hours);
  countdownElements.minutes.textContent = formatNumber(minutes);
  countdownElements.seconds.textContent = formatNumber(seconds);
}

// Start the countdown
updateCountdown();

countdownInterval = setInterval(updateCountdown, 1000);
