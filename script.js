// 1. Open and close the envelope

const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("openBtn");
const hint = document.getElementById("hint");
const replay = document.getElementById("replay");

openBtn.addEventListener("click", function () {
  envelope.classList.add("open");

  hint.textContent = "A LITTLE ENVELOPE, A LIFETIME OF LOVE";

  replay.hidden = false;
});

replay.addEventListener("click", function () {
  envelope.classList.remove("open");

  hint.textContent = "TOUCH THE GOLDEN SEAL TO UNVEIL YOUR INVITATION";

  replay.hidden = true;
});


// 2. Countdown timer

// Month 9 means October in JavaScript.

const weddingDate = new Date(2026, 9, 30, 17, 0, 0);

function updateCountdown() {
  const remaining = Math.max(
    0,
    weddingDate.getTime() - Date.now()
  );

  const values = {
    days: Math.floor(remaining / 86400000),

    hours: Math.floor(
      (remaining / 3600000) % 24
    ),

    minutes: Math.floor(
      (remaining / 60000) % 60
    ),

    seconds: Math.floor(
      (remaining / 1000) % 60
    )
  };

  for (const unit in values) {
    document.getElementById(unit).textContent =
      String(values[unit]).padStart(2, "0");
  }
}

updateCountdown();

setInterval(updateCountdown, 1000);


// 3. RSVP form

// This is a demo. It does not save information
// to a database or send it to an email.

const rsvpForm = document.getElementById("rsvpForm");

const responseMessage =
  document.getElementById("responseMessage");

rsvpForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const guestName =
    document.getElementById("guestName").value.trim();

  const attendance =
    document.getElementById("attendance").value;

  const guestCount =
    document.getElementById("guestCount").value;

  if (!guestName || !attendance) return;

  responseMessage.textContent =
    `Thank you, ${guestName}! ${attendance}. Guests: ${guestCount}.`;

  rsvpForm.reset();
});