
const intro = document.getElementById("intro");
const invitation = document.getElementById("invitation");
const envelope = document.getElementById("envelope");
const reopen = document.getElementById("reopen");

// Open the invitation
function openInvitation() {
  if (intro.classList.contains("opening")) return;

  intro.classList.add("opening");

  setTimeout(() => {
    intro.classList.add("hide");
    invitation.classList.add("visible");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, 1300);
}

envelope.addEventListener("click", openInvitation);

// Open using the keyboard
envelope.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openInvitation();
  }
});

// Return to the envelope
reopen.addEventListener("click", () => {
  invitation.classList.remove("visible");
  intro.classList.remove("hide", "opening");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Change this to your actual wedding date
const weddingDate = new Date(
  "2026-11-20T18:00:00+04:30"
);

const dateText = document.getElementById("eventDateText");

if (!Number.isNaN(weddingDate.getTime())) {
  dateText.textContent = weddingDate.toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Kabul"
    }
  );
}

// Wedding countdown
function updateCountdown() {
  const now = Date.now();
  const difference = weddingDate.getTime() - now;

  if (Number.isNaN(difference)) return;

  if (difference <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach((id) => {
      document.getElementById(id).textContent = "00";
    });

    dateText.textContent = "Our special day has arrived!";
    return;
  }

  const days = Math.floor(difference / 86400000);
  const hours = Math.floor((difference / 3600000) % 24);
  const minutes = Math.floor((difference / 60000) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  document.getElementById("days").textContent = days;

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
