const startBtn = document.getElementById("startBtn");
const backBtn = document.getElementById("backBtn");
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");

startBtn.addEventListener("click", () => {
  document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });

  // Браузеры обычно разрешают музыку только после действия пользователя.
  bgMusic.play().then(() => {
    musicToggle.classList.add("playing");
  }).catch(() => {});
});

backBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

musicToggle.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play().then(() => {
      musicToggle.classList.add("playing");
    }).catch(() => {
      alert("Добавь файл music/song.mp3 в папку проекта.");
    });
  } else {
    bgMusic.pause();
    musicToggle.classList.remove("playing");
  }
});

// Появление элементов при прокрутке.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

// Открытие фотографий.
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxDate = document.getElementById("lightboxDate");
const lightboxText = document.getElementById("lightboxText");
const closeLightbox = document.getElementById("closeLightbox");

document.querySelectorAll(".photo-card").forEach((card) => {
  card.addEventListener("click", () => {
    const image = card.querySelector("img");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxTitle.textContent = card.dataset.title;
    lightboxDate.textContent = card.dataset.date;
    lightboxText.textContent = card.dataset.text;

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  });
});

function closeModal() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

closeLightbox.addEventListener("click", closeModal);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});
