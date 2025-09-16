/* experience.js — dialog + map unlock logic (single file) */
document.addEventListener("DOMContentLoaded", () => {
  // DIALOG / SCENE
  const dialogEl = document.getElementById("dialog-text-5");
  const backBtn = document.getElementById("back-btn-5");
  const nextBtn = document.getElementById("next-btn-5");
  const startBtn = document.getElementById("start-btn-5");
  const mainAvatar = document.getElementById("mainAvatar");
  const charBox = document.querySelector(".char-box");
  const dialogBox = document.querySelector(".dialog");

  // MAP
  const mapWrap = document.getElementById("mapWrap");
  const mapModal = document.getElementById("mapModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalPlace = document.getElementById("modalPlace");
  const modalDegree = document.getElementById("modalDegree");
  const modalDesc = document.getElementById("modalDesc");
  const closeModalBtn = mapModal.querySelector(".close");
  const nextLevelBtn = document.getElementById("next-level-btn");
  const transitionOverlay = document.getElementById("transition-overlay");

  const messages = [
    "Our next objective is to find the 'Experience' file. This one is a bit more complicated, though.",
    "The file has been split into smaller pieces, and they've been scattered across the world.",
    "To get them back, we'll have to go on a journey! I've created a special map that can teleport us to different places where I've gained valuable experience. Each place holds a piece of the file, and once we collect them all, we'll put the file back together.",
    "The map is a little tricky, though. It will only reveal the path to the next location after we successfully find the file piece at our current one. Luckily, the first location is already marked with a blue waypoint, so we know exactly where to start.",
    "Ready for a little road trip? Let's begin our adventure and find all the pieces of my experience!"
  ];

  // Load avatar
  const savedOutfit = localStorage.getItem("avatarOutfitSrc");
  if (mainAvatar) mainAvatar.src = savedOutfit || "portfolio images/avatar -- p - no bg.png";

  // Typing system
  let currentIndex = 0;
  let charIndex = 0;
  let typingTimer = null;
  let isTyping = false;

  function typeWriter(text) {
    clearInterval(typingTimer);
    dialogEl.textContent = "";
    charIndex = 0;
    isTyping = true;

    function tick() {
      if (charIndex < text.length) {
        dialogEl.textContent += text.charAt(charIndex);
        charIndex++;
        typingTimer = setTimeout(tick, 28);
      } else {
        isTyping = false;
      }
    }
    tick();
  }

  function finishTyping() {
    if (isTyping) {
      clearTimeout(typingTimer);
      dialogEl.textContent = messages[currentIndex];
      isTyping = false;
    }
  }

  function showDialogAt(index) {
    currentIndex = Math.max(0, Math.min(index, messages.length - 1));
    typeWriter(messages[currentIndex]);

    // button visibility (same behavior as your other scenes)
    if (currentIndex === 0) {
      backBtn.style.display = "none";
      nextBtn.style.display = "inline-block";
      startBtn.style.display = "none";
    } else if (currentIndex < messages.length - 1) {
      backBtn.style.display = "inline-block";
      nextBtn.style.display = "inline-block";
      startBtn.style.display = "none";
    } else {
      backBtn.style.display = "inline-block";
      nextBtn.style.display = "none";
      startBtn.style.display = "inline-block";
    }
  }

  // init: show first line immediately
  showDialogAt(0);

  // nav
  backBtn.addEventListener("click", () => {
    if (isTyping) return finishTyping();
    showDialogAt(currentIndex - 1);
  });

  nextBtn.addEventListener("click", () => {
    if (isTyping) return finishTyping();
    showDialogAt(currentIndex + 1);
  });

  // Start button: hide scene and reveal map
startBtn.addEventListener("click", () => {
  if (isTyping) return finishTyping();

  dialogBox.style.display = "none";
  charBox.style.display = "none";

  // ✅ show map scene
  document.getElementById("map-section").classList.remove("hidden");

  mapWrap.classList.remove("hidden");
  mapWrap.setAttribute("aria-hidden", "false");

  const first = mapWrap.querySelector('.map-btn[data-step="1"]');
  if (first) first.classList.remove('locked');
});


  // ===== Map unlock / modal logic =====
  // unlock first button to be safe (if map already visible)
  const allMapBtns = document.querySelectorAll('.map-btn');
  if (allMapBtns && allMapBtns.length) {
    const first = document.querySelector('.map-btn[data-step="1"]');
    if (first) first.classList.remove('locked');
  }

  document.querySelectorAll('.map-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('locked')) return;

      // Fill modal and open (use flex so it's centered)
      modalTitle.textContent = btn.dataset.title || '';
      modalPlace.textContent = btn.dataset.place || '';
      modalDegree.textContent = btn.dataset.degree || '';
      modalDesc.textContent = btn.dataset.desc || '';
      mapModal.style.display = 'flex';
      mapModal.setAttribute('aria-hidden', 'false');

      // reveal path to next step and unlock
      const step = parseInt(btn.dataset.step, 10);
      const next = document.querySelector(`.map-btn[data-step="${step + 1}"]`);
      const path = document.querySelector(`.map-path[data-from="btn${step}"][data-to="btn${step + 1}"]`);
      if (next) next.classList.remove('locked');
      if (path) path.classList.add('visible');
    });
  });

  // close modal
  closeModalBtn.addEventListener('click', () => {
    mapModal.style.display = 'none';
    mapModal.setAttribute('aria-hidden', 'true');
  });

  window.addEventListener('click', (e) => {
    if (e.target === mapModal) {
      mapModal.style.display = 'none';
      mapModal.setAttribute('aria-hidden', 'true');
    }
  });

  // Level 3 button navigation (styled as button)
  if (nextLevelBtn) {
    nextLevelBtn.addEventListener('click', () => {
      // optional transition
      if (transitionOverlay) {
        transitionOverlay.classList.add('active');
      }
      // navigate after a short delay (change target as needed)
      setTimeout(() => {
        window.location.href = 'projects.html'; // or 'level3.html' — replace with the page you want
      }, 600);
    });
  }
});
