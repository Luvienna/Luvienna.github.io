// Dialogue system ------------------------
const lines = [
  "Oh, hi! You're here! You must be the person they send to collect the files, right? I'm so glad you came.",
  "My name is Lu-vienna, and I'm a programmer! Well, a magical programmer, actually! I'm the creator of all this world! ✨",
  "I know you came here to download my portfolio, you know, the big, shiny file with all my best work.",
  "But... well! There's been a bit of a glitch! The file got split into tiny, little pieces and they're all scattered across my digital world! 😱 I was trying to put them back together before you came, but they're too fast and sneaky. and you're already here, soo...",
  "I was hoping you could help me! We need to go on a little adventure to collect all the pieces of my portfolio.",
  "Each piece is in a different land, and we'll have to solve some fun puzzles to get them. Once we have them all, we can put the file back together, and you'll get to see everything! So, what do you say? Ready to start our quest?",
  "Great but first, I really need to change. a girl can't go anywhere in her PJ's, right? can you help me choose an outfit from the wardrobe?",
  "Now we are ready, let's get started with our mission."
];

const dialog   = document.getElementById('dialog-text');
const nextBtn  = document.getElementById('next-btn');
const backBtn  = document.getElementById('back-btn');
const startBtn = document.getElementById('start-btn');
const overlay  = document.getElementById('transition-overlay');

let typingInterval;
let li = 0;
let isTyping = false; // track if currently typing

function typeLine(text, speed = 22) {
  clearInterval(typingInterval);
  dialog.textContent = "";
  let i = 0;
  isTyping = true;

  typingInterval = setInterval(() => {
    dialog.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(typingInterval);
      isTyping = false;
    }
  }, speed);
}

function finishLine() {
  clearInterval(typingInterval);
  dialog.textContent = lines[li];
  isTyping = false;
}

function updateUI(){
  backBtn.style.display = (li > 0) ? "inline-block" : "none";
  nextBtn.style.display = (li < lines.length - 1) ? "inline-block" : "none";
  startBtn.style.display = (li === lines.length - 1) ? "inline-block" : "none";
}

function showLine(){
  typeLine(lines[li]);
  updateUI();
}

nextBtn.addEventListener('click', () => {
  if (isTyping) {
    finishLine();
  } else if (li < lines.length - 1) {
    li++;
    showLine();
  }
});

backBtn.addEventListener('click', () => {
  if (isTyping) {
    finishLine();
  } else if (li > 0) {
    li--;
    showLine();
  }
});

// transition when clicking Start
startBtn.addEventListener('click', e => {
  e.preventDefault();
  if (isTyping) {
    finishLine();
    return;
  }
  document.body.classList.add('page-leave');
  overlay.addEventListener('transitionend', () => {
    window.location.href = startBtn.getAttribute('href');
  }, { once: true });
});

// init
showLine();



// Outfit system ----------------------------------------
const avatar = document.getElementById('avatar');
const outfitSlots = document.querySelectorAll('.outfit-slot');

// Map slot number to actual file names
const outfitImages = {
  1: "portfolio images/avatar -- pink outfit1 - no bg.png",
  2: "portfolio images/avatar -- brown outfit2 -- no bg.png",
  3: "portfolio images/avatar -- black outfit3-- no bg.png",
  4: "portfolio images/avatar -- red outfit5-- no bg.png"
};

outfitSlots.forEach(slot => {
  slot.addEventListener('click', () => {
    const num = slot.dataset.outfit;
    avatar.src = outfitImages[num];
  });
});

outfitSlots.forEach(slot => {
  slot.addEventListener('click', () => {
    const num = slot.dataset.outfit;
    avatar.src = outfitImages[num];

    // Save to localStorage so it persists across pages
    localStorage.setItem("avatarOutfitSrc", outfitImages[num]);
  });
});


