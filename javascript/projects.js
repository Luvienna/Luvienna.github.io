document.addEventListener("DOMContentLoaded", () => {
  // ===== Utility: Show scene =====
  function showScene(id) {
    document.querySelectorAll(".scene").forEach(sc => sc.style.display = "none");
    const el = document.getElementById(id);
    if (el) el.style.display = "block";
  }

  // ===== Handle "return to scene" from project pages =====
  const returnToScene = localStorage.getItem("returnToScene");
  if (returnToScene) {
    showScene(returnToScene);
    localStorage.removeItem("returnToScene"); // Clear so it only runs once
  } else {
    showScene("scene-6"); // default start
  }

  // ===== Typing Effect Factory =====
  function createDialog({ dialogEl, backBtn, nextBtn, startBtn, messages, onFinish }) {
    let currentIndex = 0;
    let charIndex = 0;
    let typingTimer = null;
    let isTyping = false;

    function typeWriter(text) {
      dialogEl.textContent = "";
      charIndex = 0;
      isTyping = true;

      function typing() {
        if (charIndex < text.length) {
          dialogEl.textContent += text.charAt(charIndex);
          charIndex++;
          typingTimer = setTimeout(typing, 35);
        } else {
          isTyping = false;
        }
      }
      typing();
    }

    function finishTyping() {
      if (isTyping) {
        clearTimeout(typingTimer);
        dialogEl.textContent = messages[currentIndex];
        isTyping = false;
      }
    }

    function updateDialog() {
      typeWriter(messages[currentIndex]);

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

    // Avatar persistence
    const savedOutfit = localStorage.getItem("avatarOutfitSrc") || "portfolio images/avatar -- p - no bg.png";
    document.querySelectorAll('[id^="avatar-"]').forEach(avatar => {
      avatar.src = savedOutfit;
    });

    // Events
    backBtn.addEventListener("click", () => {
      if (isTyping) return finishTyping();
      if (currentIndex > 0) {
        currentIndex--;
        updateDialog();
      }
    });

    nextBtn.addEventListener("click", () => {
      if (isTyping) return finishTyping();
      if (currentIndex < messages.length - 1) {
        currentIndex++;
        updateDialog();
      }
    });

    startBtn.addEventListener("click", () => {
      if (isTyping) return finishTyping();
      if (onFinish) onFinish();
    });

    // Kick off
    updateDialog();
  }

  // ===== SCENE 6: Intro Dialog =====
  createDialog({
    dialogEl: document.getElementById("dialog-text-6"),
    backBtn: document.getElementById("back-btn-6"),
    nextBtn: document.getElementById("next-btn-6"),
    startBtn: document.getElementById("start-btn-6"),
    messages: [
      "It looks like our final file, the 'My Projects' file is hidden somewhere in this library...",
      "This library holds the knowledge I've gathered and the projects I've built along my journey.",
      "The books are arranged by topic, so you'll be able to navigate to the projects that interest you most."
    ],
    onFinish: () => {
      showScene("scene-7"); // move to books grid
    }
  });

  // ===== SCENE 7: Book Grid =====
  const cont = document.getElementById("to-scene-8");
  if (cont) {
    cont.addEventListener("click", () => {
      showScene("scene-8");
      setTimeout(() => {
        showScene("scene-9");
        startScene9();
      }, 1000);
    });
  }

  // ===== SCENE 9: Final Narrator Dialog =====
  function startScene9() {
    createDialog({
      dialogEl: document.getElementById("dialog-text-9"),
      backBtn: document.getElementById("back-btn-9"),
      nextBtn: document.getElementById("next-btn-9"),
      startBtn: document.getElementById("start-btn-9"),
      messages: [
        "And just like that, the last piece is ours! We’ve gathered all the stories, experiences, and projects we needed.",
        "Let's head back and put these files back together to get my life back on track!"
      ],
      onFinish: () => {
        window.location.href = "contact.html";
      }
    });
  }
});
